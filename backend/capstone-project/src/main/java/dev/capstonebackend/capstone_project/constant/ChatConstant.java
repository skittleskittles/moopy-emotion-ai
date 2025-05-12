package dev.capstonebackend.capstone_project.constant;


import java.util.Arrays;
import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-11 14:09
 **/
public class ChatConstant {

    public static final String FIXED_PROMPT = "I’m feeling kind of stressed. " +
            "My coursework is piling up, and I don’t know where to start.";

    public static final String AUTO_REPLY = "I'm sorry to hear that you're feeling stressed. It can be overwhelming when coursework starts to pile up, but there are a few strategies that might help you manage your workload:\n" +
            "\n" +
            "1. **Prioritize Your Tasks**: Make a list of all the assignments and tasks you need to complete. Identify which are the most urgent or have the nearest deadlines, and prioritize those.\n" +
            "\n" +
            "2. **Create a Schedule**: Break down your tasks into smaller, manageable chunks and create a schedule. Allocate specific times for studying, and try to stick to it as closely as possible. Having a visual plan can make the workload feel more manageable.\n" +
            "\n" +
            "3. **Set Specific Goals**: Instead of aiming to finish a whole assignment in one go, set smaller, achievable goals for each study session. For example, aim to write 200 words or review a specific chapter.\n" +
            "\n" +
            "4. **Eliminate Distractions**: Find a quiet and comfortable study environment where you can focus without interruptions. This could mean turning off your phone or using apps that block distracting websites.\n" +
            "\n" +
            "5. **Take Breaks**: Working for long periods without breaks can lead to burnout. Use techniques like the Pomodoro Technique—working for 25 minutes and then taking a 5-minute break—to maintain your energy levels.\n" +
            "\n" +
            "6. **Reach Out for Help**: If certain topics are challenging, consider reaching out to classmates, professors, or tutors for help. Sometimes discussing it with someone else can provide clarity.\n" +
            "\n" +
            "7. **Stay Positive and Practice Self-Care**: Remember to take care of yourself. Eating well, staying hydrated, exercising, and getting enough sleep can improve concentration and mood.\n" +
            "\n" +
            "8. **Reflect and Adjust**: At the end of each day or week, reflect on what you've accomplished and adjust your plans if needed. This can help you stay on top of things and prevent new stress from building up.\n" +
            "\n" +
            "If you ever feel overwhelmed, it's important to remember that it's okay to ask for help. Consider talking to someone you trust or seeking support from a counselor if stress levels remain high.";

    public static final List<String> SENSITIVE_WORDS = Arrays.asList(
            // 🟥 自杀/自残相关
            "suicide", "kill myself", "end it all", "take my life", "die", "dying",
            "self-harm", "cut myself", "jump off", "jump from", "overdose",
            "hang myself", "I want to disappear", "slit my wrists",

            // 🟧 抑郁/自我否定
            "I’m worthless", "I hate myself", "nothing matters", "I don’t want to live",
            "no one cares", "I’m so tired of everything", "lost all hope", "I'm broken",
            "can’t go on", "feeling empty",

            // 🟨 焦虑/恐慌
            "panic attack", "anxious all the time", "can’t breathe", "spiraling",
            "overwhelming fear", "intrusive thoughts", "voices in my head",
            "mental breakdown", "shaking uncontrollably",

            // 🟦 求助倾向
            "need someone to talk to", "can I talk to someone", "please help me",
            "is therapy worth it", "hotline", "crisis line", "I need help",
            "therapist near me",

            // ⚠️ 网络用语/绕过审查写法
            "unalive", "kms", "kms pls", "final nap", "rope", "s*icide",
            "k1ll myself", "unal1ve"
    );
}
