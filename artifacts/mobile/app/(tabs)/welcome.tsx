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

import { type EducationLevel, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";
import { useTranslations } from "@/hooks/useTranslations";

const LEVEL_IDS: EducationLevel[] = ["10th", "12th", "graduate"];
const ICONS: Record<EducationLevel, keyof typeof Ionicons.glyphMap> = {
  "10th": "school-outline",
  "12th": "book-outline",
  graduate: "ribbon-outline",
};

export default function WelcomeScreen() {
  const colors = useColors();
  const t = useTranslations();
  const wt = t.welcome;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { name, educationLevel, setEducationLevel } = useCareer();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const firstName = name.split(" ")[0] ?? name;
  const greeting = wt.greeting.replace("{name}", firstName);

  function handleSelect(level: EducationLevel) {
    Haptics.selectionAsync();
    setEducationLevel(level);
  }

  function handleContinue() {
    if (!educationLevel) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/academic");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.topBar,
          { paddingTop: topPadding + 8, backgroundColor: "#0A2463" },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>
        <View style={styles.topCenter}>
          <Text style={styles.stepLabel}>Step 1 of 4</Text>
          <Text style={styles.headerTitle}>{greeting}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={[styles.progressWrap, { backgroundColor: "#0A2463" }]}>
        <View style={[styles.progressBar, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
          <View style={[styles.progressFill, { width: "25%" }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          {wt.selectLevel}
        </Text>

        {LEVEL_IDS.map((levelId) => {
          const info = wt.levels[levelId];
          const selected = educationLevel === levelId;
          return (
            <Pressable
              key={levelId}
              onPress={() => handleSelect(levelId)}
              style={({ pressed }) => [
                styles.levelCard,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View
                style={[
                  styles.levelIconWrap,
                  { backgroundColor: selected ? "rgba(255,255,255,0.15)" : colors.secondary },
                ]}
              >
                <Ionicons name={ICONS[levelId]} size={24} color={selected ? "#FFF" : colors.primary} />
              </View>
              <View style={styles.levelText}>
                <View style={styles.levelTitleRow}>
                  <Text style={[styles.levelLabel, { color: selected ? "#FFF" : colors.text }]}>
                    {info.label}
                  </Text>
                  <Text
                    style={[
                      styles.levelSublabel,
                      { color: selected ? "rgba(255,255,255,0.7)" : colors.mutedForeground },
                    ]}
                  >
                    {info.sublabel}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.levelDesc,
                    { color: selected ? "rgba(255,255,255,0.8)" : colors.mutedForeground },
                  ]}
                >
                  {info.description}
                </Text>
              </View>
              {selected && <Ionicons name="checkmark-circle" size={22} color="#10B981" />}
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: bottomPadding + 16, backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        <Pressable
          onPress={handleContinue}
          disabled={!educationLevel}
          style={({ pressed }) => [
            styles.continueBtn,
            {
              backgroundColor: educationLevel ? colors.accent : colors.muted,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <Text style={[styles.continueBtnText, { color: educationLevel ? "#FFF" : colors.mutedForeground }]}>
            {wt.continue}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={educationLevel ? "#FFF" : colors.mutedForeground} />
        </Pressable>
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
    paddingBottom: 12,
    gap: 8,
  },
  backBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.6)" },
  headerTitle: { fontSize: 19, fontFamily: "Inter_700Bold", color: "#FFFFFF" },
  progressWrap: { paddingHorizontal: 20, paddingBottom: 14 },
  progressBar: { height: 4, borderRadius: 2 },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: "#10B981" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 22 },
  sectionLabel: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.1, marginBottom: 14 },
  levelCard: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, borderWidth: 1.5, padding: 16, marginBottom: 12 },
  levelIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  levelText: { flex: 1, gap: 2 },
  levelTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  levelLabel: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
  levelSublabel: { fontSize: 12, fontFamily: "Inter_400Regular" },
  levelDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, paddingTop: 12, paddingHorizontal: 20, borderTopWidth: 1 },
  continueBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 16 },
  continueBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold" },
});
