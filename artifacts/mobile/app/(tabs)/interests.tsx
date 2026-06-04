import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
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

const INTEREST_IDS = [
  "Tech & Coding",
  "Government Exams",
  "Management & Business",
  "Creative Arts & Design",
  "Banking & Finance",
  "Law & Judiciary",
] as const;

const INTEREST_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  "Tech & Coding": "code-slash-outline",
  "Government Exams": "business-outline",
  "Management & Business": "briefcase-outline",
  "Creative Arts & Design": "color-palette-outline",
  "Banking & Finance": "wallet-outline",
  "Law & Judiciary": "shield-checkmark-outline",
};

function ProgressBar({ step, total, colors }: { step: number; total: number; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[pb.wrap, { backgroundColor: colors.muted }]}>
      <View style={[pb.fill, { backgroundColor: colors.accent, width: `${(step / total) * 100}%` as `${number}%` }]} />
    </View>
  );
}
const pb = StyleSheet.create({ wrap: { height: 4, borderRadius: 2, marginHorizontal: 20, marginBottom: 4 }, fill: { height: "100%", borderRadius: 2 } });

export default function InterestsScreen() {
  const colors = useColors();
  const t = useTranslations();
  const it = t.interests;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { interests, setInterests } = useCareer();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  function toggleInterest(id: string) {
    Haptics.selectionAsync();
    setInterests(
      interests.includes(id) ? interests.filter((i) => i !== id) : [...interests, id]
    );
  }

  function handleAnalyze() {
    if (interests.length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/results");
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.topBar, { paddingTop: topPadding + 8 }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={s.topCenter}>
          <Text style={[s.stepLabel, { color: colors.mutedForeground }]}>{it.step}</Text>
          <Text style={[s.screenTitle, { color: colors.text }]}>{it.title}</Text>
        </View>
      </View>
      <ProgressBar step={2} total={3} colors={colors} />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[s.subtitle, { color: colors.mutedForeground }]}>{it.subtitle}</Text>
        <View style={s.grid}>
          {INTEREST_IDS.map((id) => {
            const info = it.items[id];
            const selected = interests.includes(id);
            return (
              <Pressable
                key={id}
                onPress={() => toggleInterest(id)}
                style={({ pressed }) => [
                  s.card,
                  {
                    backgroundColor: selected ? colors.primary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                    opacity: pressed ? 0.88 : 1,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                  },
                ]}
              >
                <View
                  style={[
                    s.iconWrap,
                    { backgroundColor: selected ? "rgba(255,255,255,0.15)" : colors.secondary },
                  ]}
                >
                  <Ionicons
                    name={INTEREST_ICONS[id] ?? "star-outline"}
                    size={26}
                    color={selected ? "#FFFFFF" : colors.primary}
                  />
                </View>
                <Text style={[s.cardLabel, { color: selected ? "#FFFFFF" : colors.text }]}>
                  {info.label}
                </Text>
                <Text
                  style={[
                    s.cardDesc,
                    { color: selected ? "rgba(255,255,255,0.75)" : colors.mutedForeground },
                  ]}
                >
                  {info.description}
                </Text>
                {selected && (
                  <View style={s.checkBadge}>
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          s.footer,
          { paddingBottom: bottomPadding + 16, borderTopColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        {interests.length === 0 && (
          <Text style={[s.hint, { color: colors.mutedForeground }]}>{it.hint}</Text>
        )}
        <Pressable
          onPress={handleAnalyze}
          disabled={interests.length === 0}
          style={({ pressed }) => [
            s.analyzeBtn,
            {
              backgroundColor: interests.length > 0 ? colors.primary : colors.muted,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <Ionicons
            name="flash"
            size={20}
            color={interests.length > 0 ? "#10B981" : colors.mutedForeground}
          />
          <Text
            style={[
              s.analyzeBtnText,
              { color: interests.length > 0 ? "#FFFFFF" : colors.mutedForeground },
            ]}
          >
            {it.analyze}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  backBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontFamily: "Inter_500Medium" },
  screenTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20, marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "47%", borderRadius: 16, borderWidth: 1.5, padding: 16, gap: 8, position: "relative" },
  iconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", lineHeight: 20 },
  cardDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 17 },
  checkBadge: { position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: 10, backgroundColor: "#10B981", alignItems: "center", justifyContent: "center" },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, paddingTop: 10, paddingHorizontal: 20, borderTopWidth: 1, gap: 6 },
  hint: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center" },
  analyzeBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 16 },
  analyzeBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold" },
});
