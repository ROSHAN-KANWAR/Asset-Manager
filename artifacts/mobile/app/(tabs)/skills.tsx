import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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

export default function SkillsScreen() {
  const colors = useColors();
  const t = useTranslations();
  const st = t.skills;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { educationLevel } = useCareer();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const isCollege = educationLevel === "graduate";
  const categories = isCollege ? st.categories.college : st.categories.school;
  const subtitle = isCollege ? st.subtitleCollege : st.subtitleSchool;

  const allItems = useMemo(
    () => categories.flatMap((c) => c.items),
    [categories]
  );
  const [checked, setChecked] = useState<Set<string>>(() => new Set());

  const doneCount = checked.size;
  const totalCount = allItems.length;

  const progressLabel = st.progressLabel
    .replace("{done}", String(doneCount))
    .replace("{total}", String(totalCount));

  const progressPct = totalCount > 0 ? doneCount / totalCount : 0;

  function toggleItem(item: string) {
    Haptics.selectionAsync();
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function resetAll() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setChecked(new Set());
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.topBar, { paddingTop: topPadding + 8, backgroundColor: "#0A2463" }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>
        <View style={s.topCenter}>
          <Text style={s.titleText}>{st.title}</Text>
          <Text style={s.subtitleText}>{subtitle}</Text>
        </View>
        <Pressable onPress={resetAll} style={s.resetBtn}>
          <Ionicons name="refresh-outline" size={16} color="rgba(255,255,255,0.7)" />
          <Text style={s.resetBtnText}>{st.resetBtn}</Text>
        </Pressable>
      </View>

      {/* Progress bar */}
      <View style={[s.progressWrap, { backgroundColor: "#0A2463" }]}>
        <View style={[s.progressTrack, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
          <View
            style={[s.progressFill, { width: `${Math.round(progressPct * 100)}%` }]}
          />
        </View>
        <Text style={s.progressLabel}>{progressLabel}</Text>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((cat, ci) => (
          <View key={ci} style={[s.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[s.categoryHeader, { borderBottomColor: colors.border }]}>
              <View style={[s.catIconWrap, { backgroundColor: `${cat.color}18` }]}>
                <Ionicons name={cat.icon as keyof typeof Ionicons.glyphMap} size={20} color={cat.color} />
              </View>
              <Text style={[s.categoryName, { color: colors.text }]}>{cat.category}</Text>
              <Text style={[s.catCount, { color: colors.mutedForeground }]}>
                {cat.items.filter((item) => checked.has(item)).length}/{cat.items.length}
              </Text>
            </View>
            {cat.items.map((item, ii) => {
              const done = checked.has(item);
              return (
                <Pressable
                  key={ii}
                  onPress={() => toggleItem(item)}
                  style={({ pressed }) => [
                    s.skillRow,
                    {
                      backgroundColor: done ? `${cat.color}09` : "transparent",
                      borderBottomColor: colors.border,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      s.checkbox,
                      {
                        borderColor: done ? cat.color : colors.border,
                        backgroundColor: done ? cat.color : "transparent",
                      },
                    ]}
                  >
                    {done && <Ionicons name="checkmark" size={12} color="#FFF" />}
                  </View>
                  <Text
                    style={[
                      s.skillText,
                      {
                        color: done ? colors.mutedForeground : colors.foreground,
                        textDecorationLine: done ? "line-through" : "none",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 2 },
  titleText: { fontSize: 18, fontFamily: "Inter_700Bold", color: "#FFFFFF" },
  subtitleText: { fontSize: 12, fontFamily: "Inter_400Regular", color: "rgba(255,255,255,0.7)" },
  resetBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)" },
  resetBtnText: { fontSize: 11, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.7)" },
  progressWrap: { paddingHorizontal: 16, paddingBottom: 14, gap: 6 },
  progressTrack: { height: 5, borderRadius: 3 },
  progressFill: { height: "100%", borderRadius: 3, backgroundColor: "#10B981" },
  progressLabel: { fontSize: 12, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.65)", alignSelf: "flex-end" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, gap: 14 },
  categoryCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  categoryHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderBottomWidth: 1 },
  catIconWrap: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  categoryName: { flex: 1, fontSize: 15, fontFamily: "Inter_700Bold" },
  catCount: { fontSize: 13, fontFamily: "Inter_500Medium" },
  skillRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 1 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 },
  skillText: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 21 },
});
