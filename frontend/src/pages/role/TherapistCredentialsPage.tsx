import React, { useEffect, useState } from "react";
import { ROUTE_PATHS } from "@/routes/Routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const TherapistCredentialsPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [licenseTypes, setLicenseTypes] = useState<string[]>([]);
  const [states, setStates] = useState<{ name: string; code: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    licenseType: "",
    licenseNumber: "",
    issuingState: "",
    expirationDate: "",
    document: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.licenseType.trim() !== "" &&
    formData.licenseNumber.trim() !== "" &&
    formData.issuingState.trim() !== "" &&
    formData.expirationDate.trim() !== "" &&
    formData.document !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [licenseRes, statesRes] = await Promise.all([
          fetch("/data/licenseTypes.json"),
          fetch("/data/states.json"),
        ]);

        if (!licenseRes.ok || !statesRes.ok) {
          throw new Error("Failed to load reference data");
        }

        const licenseTypes = await licenseRes.json();
        const states = await statesRes.json();

        setLicenseTypes(licenseTypes);
        setStates(states);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load license/state data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleSubmit = async () => {
    if (!user || !isLoggedIn()) return;
    if (!isFormValid) {
      setError("Please complete all fields.");
      return;
    }

    setIsLoading(true); // disable repeat click
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("licenseType", formData.licenseType);
    data.append("licenseNumber", formData.licenseNumber);
    data.append("issuingState", formData.issuingState);
    data.append("expirationDate", formData.expirationDate);
    if (formData.document) data.append("document", formData.document);

    try {
      //   await axios.post(`/api/users/${user.id}/verify-license`, data, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      navigate(ROUTE_PATHS.THERAPIST_DASHBOARD);
    } catch (error) {
      setError("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="text-center mb-12">
        <h1 className="text-[42px] sm:text-[55px] leading-tight font-serif text-[#0F0F0E] tracking-tight mt-10">
          Verify Your Professional Credentials
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#A9A6A6] mt-2">
          To ensure a safe and ethical space for all users, we verify each
          therapist’s license before activating their account.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Form */}
      <div className="w-[622px] bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div className="col-span-2">
            <label className="block text-lg">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-[16px] focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              required
            />
          </div>

          {/* License Type */}
          <div className="col-span-2">
            <label className="block text-lg mt-1">License Type</label>
            <select
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-[16px] focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                formData.licenseType === "" ? "text-gray-400" : "text-black"
              }`}
              required
            >
              <option value="">Select a license type</option>
              {licenseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* License Number */}
          <div className="col-span-2">
            <label className="block text-lg mt-1">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-[16px] focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              required
            />
          </div>

          {/* Issuing State */}
          <div>
            <label className="block text-lg mt-1">Issuing State</label>
            <select
              name="issuingState"
              value={formData.issuingState}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-[16px] focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                formData.issuingState === "" ? "text-gray-400" : "text-black"
              }`}
              required
            >
              <option value="">Choose a state</option>
              {states.map((s) => (
                <option
                  key={s.code}
                  value={s.code}
                >{`${s.name} (${s.code})`}</option>
              ))}
            </select>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-lg mt-1">
              License Expiration Date
            </label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-[16px] focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                formData.expirationDate === "" ? "text-gray-400" : "text-black"
              }`}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {/* Upload License Document */}
          <div className="col-span-2">
            <label className="block text-lg mt-1 mb-2">
              Upload License Document
            </label>

            <div className="flex items-center gap-4 ">
              <label className="px-4 py-2 border border-gray-300 bg-gray-200 font-medium rounded cursor-pointer hover:bg-gray-300">
                Choose File
                <input
                  type="file"
                  name="document"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {formData.document && (
                <span className="font-medium">{formData.document.name}</span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className={`w-[80%] font-medium py-2 rounded-lg text-[16px] text-white ${
                isFormValid && !isLoading
                  ? "bg-[#6782B8] hover:bg-[#769fcd]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading}
            >
              Submit for Verification
            </button>
          </div>

          <p className="col-span-2 w-full text-center text-sm text-gray-500">
            Your information will remain confidential and used only for
            verification purposes.
          </p>
        </form>
      </div>
    </div>
  );
};

export default TherapistCredentialsPage;
