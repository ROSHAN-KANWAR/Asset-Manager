import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

type Tab = "govt" | "private";

export default function CompareScreen() {
  const colors = useColors();
  const t = useTranslations();
  const ct = t.compare;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { educationLevel } = useCareer();
  const [tab, setTab] = useState<Tab>("govt");

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const levelKey = educationLevel ?? "graduate";
  const govtData = ct.govt[levelKey];
  const privateData = ct.private[levelKey];

  const forLabel =
    levelKey === "10th" ? ct.for10th : levelKey === "12th" ? ct.for12th : ct.forGrad;

  function switchTab(t: Tab) {
    Haptics.selectionAsync();
    setTab(t);
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.topBar, { paddingTop: topPadding + 8, backgroundColor: "#0A2463" }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>
        <View style={s.topCenter}>
          <Text style={s.titleText}>{ct.title}</Text>
          <Text style={s.subtitleText}>{forLabel}</Text>
        </View>
      </View>

      <View style={[s.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => switchTab("govt")}
          style={[s.tab, tab === "govt" && { borderBottomColor: "#0A2463", borderBottomWidth: 2.5 }]}
        >
          <Ionicons
            name="business-outline"
            size={16}
            color={tab === "govt" ? "#0A2463" : colors.mutedForeground}
          />
          <Text style={[s.tabText, { color: tab === "govt" ? "#0A2463" : colors.mutedForeground }]}>
            {ct.toggleGovt}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => switchTab("private")}
          style={[s.tab, tab === "private" && { borderBottomColor: "#10B981", borderBottomWidth: 2.5 }]}
        >
          <Ionicons
            name="briefcase-outline"
            size={16}
            color={tab === "private" ? "#10B981" : colors.mutedForeground}
          />
          <Text style={[s.tabText, { color: tab === "private" ? "#10B981" : colors.mutedForeground }]}>
            {ct.togglePrivate}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {tab === "govt" && (
          <>
            <View style={[s.sectionHeader, { backgroundColor: "#EEF1FA", borderColor: "#C5CFED" }]}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#0A2463" />
              <Text style={[s.sectionHeading, { color: "#0A2463" }]}>{govtData.heading}</Text>
            </View>
            {govtData.tracks.map((track, i) => (
              <View key={i} style={[s.trackCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={s.trackTop}>
                  <View style={[s.trackIndex, { backgroundColor: "#0A2463" }]}>
                    <Text style={s.trackIndexText}>{i + 1}</Text>
                  </View>
                  <Text style={[s.trackName, { color: colors.text }]}>{track.name}</Text>
                </View>
                <Text style={[s.trackDesc, { color: colors.mutedForeground }]}>{track.desc}</Text>
                <View style={[s.ageBadge, { backgroundColor: "#EEF1FA" }]}>
                  <Ionicons name="time-outline" size={12} color="#0A2463" />
                  <Text style={[s.ageBadgeText, { color: "#0A2463" }]}>
                    {"ageLimit" in track ? track.ageLimit : ""}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {tab === "private" && (
          <>
            <View style={[s.sectionHeader, { backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" }]}>
              <Ionicons name="trending-up-outline" size={18} color="#10B981" />
              <Text style={[s.sectionHeading, { color: "#059669" }]}>{privateData.heading}</Text>
            </View>
            {privateData.tracks.map((track, i) => (
              <View key={i} style={[s.trackCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={s.trackTop}>
                  <View style={[s.trackIndex, { backgroundColor: "#10B981" }]}>
                    <Text style={s.trackIndexText}>{i + 1}</Text>
                  </View>
                  <Text style={[s.trackName, { color: colors.text }]}>{track.name}</Text>
                </View>
                <Text style={[s.trackDesc, { color: colors.mutedForeground }]}>{track.desc}</Text>
                <View style={[s.ageBadge, { backgroundColor: "#ECFDF5" }]}>
                  <Ionicons name="cash-outline" size={12} color="#059669" />
                  <Text style={[s.ageBadgeText, { color: "#059669" }]}>
                    {"salary" in track ? track.salary : ""}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 14, gap: 10 },
  backBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  topCenter: { flex: 1, gap: 2 },
  titleText: { fontSize: 19, fontFamily: "Inter_700Bold", color: "#FFFFFF" },
  subtitleText: { fontSize: 13, fontFamily: "Inter_400Regular", color: "rgba(255,255,255,0.7)" },
  tabBar: { flexDirection: "row", borderBottomWidth: 1 },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 13, borderBottomWidth: 2.5, borderBottomColor: "transparent" },
  tabText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, gap: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  sectionHeading: { fontSize: 14, fontFamily: "Inter_700Bold", flex: 1 },
  trackCard: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  trackTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  trackIndex: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  trackIndexText: { fontSize: 13, fontFamily: "Inter_700Bold", color: "#FFF" },
  trackName: { flex: 1, fontSize: 15, fontFamily: "Inter_600SemiBold" },
  trackDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  ageBadge: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  ageBadgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
});
