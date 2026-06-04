import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";

interface GuidanceSection {
  title: string;
  items: string[];
}

interface GuidanceResponse {
  summary: string;
  sections: GuidanceSection[];
}

const SECTION_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  "Recommended Streams After 10th": "git-branch-outline",
  "Diploma & Short-Term Courses": "school-outline",
  "Skills to Start Building Now": "construct-outline",
  "Competitive Exams to Explore": "document-text-outline",
  "Best Bachelor Degree Options": "ribbon-outline",
  "Key Entrance Exams to Target": "trophy-outline",
  "Career Paths Based on Your Profile": "map-outline",
  "Entry-Level Job Opportunities": "briefcase-outline",
  "Career Roadmap": "navigate-outline",
  "Higher Education Options": "book-outline",
  "Top Corporate Job Roles for You": "people-outline",
  "Government Exam Opportunities": "business-outline",
};

const DOTS = ["", ".", "..", "..."];

function LoadingView({ colors }: { colors: ReturnType<typeof useColors> }) {
  const pulse = useRef(new Animated.Value(0.7)).current;
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.7, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    const timer = setInterval(() => {
      setDotIndex((i) => (i + 1) % DOTS.length);
    }, 600);
    return () => clearInterval(timer);
  }, [pulse]);

  return (
    <View style={loadStyles.container}>
      <Animated.View style={[loadStyles.iconWrap, { opacity: pulse, backgroundColor: colors.secondary }]}>
        <Ionicons name="flash" size={40} color={colors.primary} />
      </Animated.View>
      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
      <Text style={[loadStyles.title, { color: colors.text }]}>
        Analyzing Your Profile{DOTS[dotIndex]}
      </Text>
      <Text style={[loadStyles.subtitle, { color: colors.mutedForeground }]}>
        Our AI is crafting personalized guidance just for you
      </Text>
    </View>
  );
}

const loadStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  iconWrap: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center", marginTop: 8 },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
});

export default function ResultsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, academicData, interests, reset } = useCareer();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<GuidanceResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  async function fetchGuidance() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const domain = process.env.EXPO_PUBLIC_DOMAIN;
      const baseUrl = domain ? `https://${domain}` : "";
      const response = await fetch(`${baseUrl}/api/career/guidance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educationLevel,
          academicData,
          interests,
        }),
      });

      if (!response.ok) {
        const err = (await response.json()) as { error?: string };
        throw new Error(err.error ?? "Request failed");
      }

      const result = (await response.json()) as GuidanceResponse;
      setData(result);
      setStatus("success");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMsg(msg);
      setStatus("error");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  useEffect(() => {
    fetchGuidance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStartOver() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
    router.replace("/");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {status !== "loading" && (
        <View style={[styles.topBar, { paddingTop: topPadding + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.topCenter}>
            <Text style={[styles.stepLabel, { color: colors.mutedForeground }]}>Step 3 of 3</Text>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Career Guidance</Text>
          </View>
        </View>
      )}

      {status === "loading" && <LoadingView colors={colors} />}

      {status === "error" && (
        <View style={[styles.errorContainer, { paddingTop: topPadding }]}>
          <View style={[styles.errorIcon, { backgroundColor: "#FEE2E2" }]}>
            <Ionicons name="cloud-offline-outline" size={40} color={colors.destructive} />
          </View>
          <Text style={[styles.errorTitle, { color: colors.text }]}>
            Couldn't Fetch Guidance
          </Text>
          <Text style={[styles.errorBody, { color: colors.mutedForeground }]}>
            {errorMsg}
          </Text>
          <Pressable
            onPress={fetchGuidance}
            style={({ pressed }) => [
              styles.retryBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Ionicons name="refresh-outline" size={18} color="#FFF" />
            <Text style={styles.retryBtnText}>Try Again</Text>
          </Pressable>
          <Pressable onPress={handleStartOver} style={styles.startOverLink}>
            <Text style={[styles.startOverLinkText, { color: colors.mutedForeground }]}>
              Start Over
            </Text>
          </Pressable>
        </View>
      )}

      {status === "success" && data && (
        <Animated.View style={[{ flex: 1, opacity: fadeAnim }]}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 32 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Summary Hero Card */}
            <LinearGradient
              colors={["#0A2463", "#1B3B9C"]}
              style={styles.summaryCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.summaryHeader}>
                <View style={styles.summaryIconWrap}>
                  <Ionicons name="flash" size={20} color="#10B981" />
                </View>
                <Text style={styles.summaryLabel}>AI ANALYSIS</Text>
              </View>
              <Text style={styles.summaryText}>{data.summary}</Text>
              <View style={styles.summaryMeta}>
                <View style={styles.summaryTag}>
                  <Ionicons name="school-outline" size={12} color="rgba(255,255,255,0.7)" />
                  <Text style={styles.summaryTagText}>
                    {educationLevel === "10th"
                      ? "10th Student"
                      : educationLevel === "12th"
                        ? "12th Student"
                        : "Graduate"}
                  </Text>
                </View>
                {interests.slice(0, 2).map((i) => (
                  <View key={i} style={styles.summaryTag}>
                    <Text style={styles.summaryTagText}>{i}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {/* Section Cards */}
            {data.sections.map((section, idx) => (
              <SectionCard
                key={idx}
                section={section}
                colors={colors}
                index={idx}
              />
            ))}

            {/* Start Over */}
            <Pressable
              onPress={handleStartOver}
              style={({ pressed }) => [
                styles.startOverBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons name="refresh-outline" size={18} color={colors.primary} />
              <Text style={[styles.startOverText, { color: colors.primary }]}>
                Start New Assessment
              </Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

function SectionCard({
  section,
  colors,
  index,
}: {
  section: GuidanceSection;
  colors: ReturnType<typeof useColors>;
  index: number;
}) {
  const icon = SECTION_ICONS[section.title] ?? "bulb-outline";
  const accentColors = ["#0A2463", "#1B3B9C", "#10B981", "#059669"];
  const accentColor = accentColors[index % accentColors.length] ?? "#0A2463";

  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIconWrap, { backgroundColor: `${accentColor}18` }]}>
          <Ionicons name={icon} size={20} color={accentColor} />
        </View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
      </View>
      <View style={styles.sectionItems}>
        {section.items.map((item, i) => (
          <View key={i} style={styles.sectionItem}>
            <View style={[styles.bullet, { backgroundColor: accentColor }]} />
            <Text style={[styles.sectionItemText, { color: colors.foreground }]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 8,
  },
  backBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontFamily: "Inter_500Medium" },
  screenTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  summaryHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  summaryIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(16,185,129,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1.2,
  },
  summaryText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#FFFFFF",
    lineHeight: 23,
  },
  summaryMeta: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  summaryTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  summaryTagText: { fontSize: 11, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.8)" },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: { fontSize: 15, fontFamily: "Inter_700Bold", flex: 1, lineHeight: 21 },
  sectionItems: { gap: 10 },
  sectionItem: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },
  sectionItemText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 21, flex: 1 },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 14,
  },
  errorIcon: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  errorTitle: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center" },
  errorBody: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 21 },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  retryBtnText: { fontSize: 16, fontFamily: "Inter_600SemiBold", color: "#FFF" },
  startOverLink: { marginTop: 4 },
  startOverLinkText: { fontSize: 14, fontFamily: "Inter_400Regular" },
  startOverBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    marginTop: 4,
  },
  startOverText: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
});
