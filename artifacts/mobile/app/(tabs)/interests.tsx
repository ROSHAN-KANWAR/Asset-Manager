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

interface Interest {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const INTERESTS: Interest[] = [
  {
    id: "Tech & Coding",
    label: "Tech & Coding",
    icon: "code-slash-outline",
    description: "Software, AI, data & web",
  },
  {
    id: "Government Exams",
    label: "Government Exams",
    icon: "business-outline",
    description: "UPSC, SSC, banking & more",
  },
  {
    id: "Management & Business",
    label: "Management & Business",
    icon: "briefcase-outline",
    description: "MBA, startups & corporate",
  },
  {
    id: "Creative Arts & Design",
    label: "Creative Arts & Design",
    icon: "color-palette-outline",
    description: "Art, design, media & fashion",
  },
  {
    id: "Banking & Finance",
    label: "Banking & Finance",
    icon: "wallet-outline",
    description: "Finance, investment & banking",
  },
  {
    id: "Law & Judiciary",
    label: "Law & Judiciary",
    icon: "shield-checkmark-outline",
    description: "Law, courts & legal services",
  },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  const colors = useColors();
  return (
    <View style={[pStyles.container, { backgroundColor: colors.muted }]}>
      <View
        style={[
          pStyles.fill,
          { backgroundColor: colors.accent, width: `${(step / total) * 100}%` as `${number}%` },
        ]}
      />
    </View>
  );
}

const pStyles = StyleSheet.create({
  container: { height: 4, borderRadius: 2, marginHorizontal: 20, marginBottom: 4 },
  fill: { height: "100%", borderRadius: 2 },
});

export default function InterestsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { interests, setInterests } = useCareer();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  function toggleInterest(id: string) {
    Haptics.selectionAsync();
    const next = interests.includes(id)
      ? interests.filter((i) => i !== id)
      : [...interests, id];
    setInterests(next);
  }

  function handleAnalyze() {
    if (interests.length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/results");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { paddingTop: topPadding + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.topCenter}>
          <Text style={[styles.stepLabel, { color: colors.mutedForeground }]}>Step 2 of 3</Text>
          <Text style={[styles.screenTitle, { color: colors.text }]}>Your Interests</Text>
        </View>
      </View>
      <ProgressBar step={2} total={3} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Select areas that excite you — choose as many as you like
        </Text>

        <View style={styles.grid}>
          {INTERESTS.map((interest) => {
            const selected = interests.includes(interest.id);
            return (
              <Pressable
                key={interest.id}
                onPress={() => toggleInterest(interest.id)}
                style={({ pressed }) => [
                  styles.card,
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
                    styles.iconWrap,
                    {
                      backgroundColor: selected
                        ? "rgba(255,255,255,0.15)"
                        : colors.secondary,
                    },
                  ]}
                >
                  <Ionicons
                    name={interest.icon}
                    size={26}
                    color={selected ? "#FFFFFF" : colors.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.cardLabel,
                    { color: selected ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {interest.label}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    {
                      color: selected
                        ? "rgba(255,255,255,0.75)"
                        : colors.mutedForeground,
                    },
                  ]}
                >
                  {interest.description}
                </Text>
                {selected && (
                  <View style={styles.checkBadge}>
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
          styles.footer,
          {
            paddingBottom: bottomPadding + 16,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
          },
        ]}
      >
        {interests.length === 0 && (
          <Text style={[styles.hint, { color: colors.mutedForeground }]}>
            Select at least one interest to continue
          </Text>
        )}
        <Pressable
          onPress={handleAnalyze}
          disabled={interests.length === 0}
          style={({ pressed }) => [
            styles.analyzeBtn,
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
              styles.analyzeBtnText,
              { color: interests.length > 0 ? "#FFFFFF" : colors.mutedForeground },
            ]}
          >
            Get AI Career Guidance
          </Text>
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
  backBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  topCenter: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontFamily: "Inter_500Medium" },
  screenTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    gap: 8,
    position: "relative",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 17,
  },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    gap: 6,
  },
  hint: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center" },
  analyzeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
  },
  analyzeBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold" },
});
