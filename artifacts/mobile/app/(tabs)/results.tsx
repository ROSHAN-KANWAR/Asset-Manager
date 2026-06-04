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
import { useTranslations } from "@/hooks/useTranslations";

interface GuidanceSection {
  title: string;
  items: string[];
}

interface GuidanceResponse {
  summary: string;
  sections: GuidanceSection[];
}

const SECTION_ICONS_BY_INDEX: Array<keyof typeof Ionicons.glyphMap> = [
  "git-branch-outline",
  "school-outline",
  "construct-outline",
  "document-text-outline",
];

const SECTION_ACCENT_COLORS = ["#0A2463", "#1B3B9C", "#10B981", "#059669"];

const DOTS = ["", ".", "..", "..."];

function LoadingView({
  colors,
  analyzing,
  analyzingSubtitle,
}: {
  colors: ReturnType<typeof useColors>;
  analyzing: string;
  analyzingSubtitle: string;
}) {
  const pulse = useRef(new Animated.Value(0.7)).current;
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.7, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
    const timer = setInterval(() => setDotIndex((i) => (i + 1) % DOTS.length), 600);
    return () => clearInterval(timer);
  }, [pulse]);

  return (
    <View style={ls.container}>
      <Animated.View style={[ls.iconWrap, { opacity: pulse, backgroundColor: colors.secondary }]}>
        <Ionicons name="flash" size={40} color={colors.primary} />
      </Animated.View>
      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
      <Text style={[ls.title, { color: colors.text }]}>
        {analyzing}{DOTS[dotIndex]}
      </Text>
      <Text style={[ls.subtitle, { color: colors.mutedForeground }]}>{analyzingSubtitle}</Text>
    </View>
  );
}

const ls = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  iconWrap: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center", marginTop: 8 },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
});

export default function ResultsScreen() {
  const colors = useColors();
  const t = useTranslations();
  const rt = t.results;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, academicData, interests, language, reset } = useCareer();

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
      const domain = process.env["EXPO_PUBLIC_DOMAIN"];
      const baseUrl = domain ? `https://${domain}` : "";
      const response = await fetch(`${baseUrl}/api/career/guidance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ educationLevel, academicData, interests, language }),
      });
      if (!response.ok) {
        const err = (await response.json()) as { error?: string };
        throw new Error(err.error ?? "Request failed");
      }
      const result = (await response.json()) as GuidanceResponse;
      setData(result);
      setStatus("success");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
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

  const levelLabel = educationLevel
    ? (rt.levelLabels[educationLevel] ?? educationLevel)
    : "";

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      {status !== "loading" && (
        <View style={[s.topBar, { paddingTop: topPadding + 8 }]}>
          <Pressable onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <View style={s.topCenter}>
            <Text style={[s.stepLabel, { color: colors.mutedForeground }]}>{rt.step}</Text>
            <Text style={[s.screenTitle, { color: colors.text }]}>{rt.title}</Text>
          </View>
        </View>
      )}

      {status === "loading" && (
        <LoadingView
          colors={colors}
          analyzing={rt.analyzing}
          analyzingSubtitle={rt.analyzingSubtitle}
        />
      )}

      {status === "error" && (
        <View style={[s.errorContainer, { paddingTop: topPadding }]}>
          <View style={[s.errorIcon, { backgroundColor: "#FEE2E2" }]}>
            <Ionicons name="cloud-offline-outline" size={40} color={colors.destructive} />
          </View>
          <Text style={[s.errorTitle, { color: colors.text }]}>{rt.errorTitle}</Text>
          <Text style={[s.errorBody, { color: colors.mutedForeground }]}>{errorMsg}</Text>
          <Pressable
            onPress={fetchGuidance}
            style={({ pressed }) => [s.retryBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
          >
            <Ionicons name="refresh-outline" size={18} color="#FFF" />
            <Text style={s.retryBtnText}>{rt.retry}</Text>
          </Pressable>
          <Pressable onPress={handleStartOver} style={s.startOverLink}>
            <Text style={[s.startOverLinkText, { color: colors.mutedForeground }]}>{rt.startOver}</Text>
          </Pressable>
        </View>
      )}

      {status === "success" && data && (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ScrollView
            style={s.scroll}
            contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 32 }]}
            showsVerticalScrollIndicator={false}
          >
            <LinearGradient
              colors={["#0A2463", "#1B3B9C"]}
              style={s.summaryCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={s.summaryHeader}>
                <View style={s.summaryIconWrap}>
                  <Ionicons name="flash" size={18} color="#10B981" />
                </View>
                <Text style={s.summaryLabel}>{rt.analysisLabel}</Text>
              </View>
              <Text style={s.summaryText}>{data.summary}</Text>
              <View style={s.summaryMeta}>
                <View style={s.summaryTag}>
                  <Ionicons name="school-outline" size={11} color="rgba(255,255,255,0.7)" />
                  <Text style={s.summaryTagText}>{levelLabel}</Text>
                </View>
                {interests.slice(0, 2).map((id) => (
                  <View key={id} style={s.summaryTag}>
                    <Text style={s.summaryTagText}>
                      {t.interests.items[id as keyof typeof t.interests.items]?.label ?? id}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {data.sections.map((section, idx) => (
              <SectionCard
                key={idx}
                section={section}
                colors={colors}
                icon={SECTION_ICONS_BY_INDEX[idx % SECTION_ICONS_BY_INDEX.length] ?? "bulb-outline"}
                accentColor={SECTION_ACCENT_COLORS[idx % SECTION_ACCENT_COLORS.length] ?? "#0A2463"}
              />
            ))}

            <Pressable
              onPress={handleStartOver}
              style={({ pressed }) => [
                s.startOverBtn,
                { borderColor: colors.border, backgroundColor: colors.card, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Ionicons name="refresh-outline" size={18} color={colors.primary} />
              <Text style={[s.startOverText, { color: colors.primary }]}>{rt.startOver}</Text>
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
  icon,
  accentColor,
}: {
  section: GuidanceSection;
  colors: ReturnType<typeof useColors>;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
}) {
  return (
    <View style={[s.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={s.sectionHeader}>
        <View style={[s.sectionIconWrap, { backgroundColor: `${accentColor}18` }]}>
          <Ionicons name={icon} size={20} color={accentColor} />
        </View>
        <Text style={[s.sectionTitle, { color: colors.text }]}>{section.title}</Text>
      </View>
      <View style={s.sectionItems}>
        {section.items.map((item, i) => (
          <View key={i} style={s.sectionItem}>
            <View style={[s.bullet, { backgroundColor: accentColor }]} />
            <Text style={[s.sectionItemText, { color: colors.foreground }]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  backBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontFamily: "Inter_500Medium" },
  screenTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  summaryCard: { borderRadius: 20, padding: 20, gap: 12 },
  summaryHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  summaryIconWrap: { width: 30, height: 30, borderRadius: 10, backgroundColor: "rgba(16,185,129,0.15)", alignItems: "center", justifyContent: "center" },
  summaryLabel: { fontSize: 11, fontFamily: "Inter_600SemiBold", color: "rgba(255,255,255,0.6)", letterSpacing: 1.2 },
  summaryText: { fontSize: 15, fontFamily: "Inter_400Regular", color: "#FFFFFF", lineHeight: 23 },
  summaryMeta: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  summaryTag: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.12)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  summaryTagText: { fontSize: 11, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.8)" },
  sectionCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionIconWrap: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontSize: 15, fontFamily: "Inter_700Bold", flex: 1, lineHeight: 21 },
  sectionItems: { gap: 10 },
  sectionItem: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },
  sectionItemText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 21, flex: 1 },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 14 },
  errorIcon: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  errorTitle: { fontSize: 20, fontFamily: "Inter_700Bold", textAlign: "center" },
  errorBody: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 21 },
  retryBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14, marginTop: 4 },
  retryBtnText: { fontSize: 16, fontFamily: "Inter_600SemiBold", color: "#FFF" },
  startOverLink: { marginTop: 4 },
  startOverLinkText: { fontSize: 14, fontFamily: "Inter_400Regular" },
  startOverBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 14, borderWidth: 1.5, marginTop: 4 },
  startOverText: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
});
