import { Ionicons } from "@expo/vector-icons";
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

const STREAM_KEYS = ["Science", "Commerce", "Arts"] as const;
type StreamKey = (typeof STREAM_KEYS)[number];

export default function ExploreScreen() {
  const colors = useColors();
  const t = useTranslations();
  const et = t.explore;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { educationLevel, academicData } = useCareer();
  const [selected10thStream, setSelected10thStream] = useState<StreamKey | null>(null);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const subtitle =
    educationLevel === "10th"
      ? et.subtitle10
      : educationLevel === "12th"
        ? et.subtitle12
        : et.subtitleGrad;

  const stream12 = (academicData["stream12"] as string | undefined) ?? "";
  const streamDegrees =
    et.degreesByStream[stream12 as keyof typeof et.degreesByStream] ??
    et.degreesByStream["Science (PCM)"];

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.topBar, { paddingTop: topPadding + 8, backgroundColor: "#0A2463" }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>
        <View style={s.topCenter}>
          <Text style={s.titleText}>{et.title}</Text>
          <Text style={s.subtitleText}>{subtitle}</Text>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {educationLevel === "10th" && (
          <>
            {STREAM_KEYS.map((key) => {
              const info = et.streams[key];
              const isOpen = selected10thStream === key;
              const cardColor = key === "Science" ? "#0A2463" : key === "Commerce" ? "#1B3B9C" : "#10B981";
              return (
                <Pressable
                  key={key}
                  onPress={() => setSelected10thStream(isOpen ? null : key)}
                  style={({ pressed }) => [
                    s.streamCard,
                    { backgroundColor: colors.card, borderColor: isOpen ? cardColor : colors.border, opacity: pressed ? 0.9 : 1 },
                  ]}
                >
                  <View style={s.streamCardHeader}>
                    <View style={[s.streamDot, { backgroundColor: cardColor }]} />
                    <Text style={[s.streamName, { color: colors.text }]}>{info.label}</Text>
                    <Ionicons
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={colors.mutedForeground}
                    />
                  </View>
                  {isOpen && (
                    <View style={s.streamBody}>
                      <Text style={[s.streamDesc, { color: colors.mutedForeground }]}>
                        {info.description}
                      </Text>
                      <Text style={[s.subHeading, { color: colors.text }]}>Career Paths</Text>
                      {info.careers.map((c, i) => (
                        <Text key={i} style={[s.careerItem, { color: colors.foreground }]}>{c}</Text>
                      ))}
                      <View style={s.prosRow}>
                        {info.pros.map((p, i) => (
                          <View key={i} style={[s.prosBadge, { backgroundColor: `${cardColor}18` }]}>
                            <Text style={[s.prosBadgeText, { color: cardColor }]}>{p}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </>
        )}

        {educationLevel === "12th" && (
          <>
            <View style={[s.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[s.infoCardTitle, { color: colors.primary }]}>{streamDegrees.label}</Text>
              <Text style={[s.infoCardHint, { color: colors.mutedForeground }]}>
                {stream12 ? `Based on your stream: ${stream12}` : "Popular degree options"}
              </Text>
            </View>
            {streamDegrees.degrees.map((d, i) => (
              <View key={i} style={[s.degreeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[s.degreeIndex, { backgroundColor: colors.primary }]}>
                  <Text style={s.degreeIndexText}>{i + 1}</Text>
                </View>
                <View style={s.degreeText}>
                  <Text style={[s.degreeName, { color: colors.text }]}>{d.name}</Text>
                  <Text style={[s.degreeNote, { color: colors.mutedForeground }]}>{d.note}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {educationLevel === "graduate" && (
          <>
            {(["higher", "direct"] as const).map((pathKey) => {
              const path = et.gradPaths[pathKey];
              return (
                <View
                  key={pathKey}
                  style={[s.gradPathCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={[s.gradPathHeader, { backgroundColor: `${path.color}12` }]}>
                    <View style={[s.gradPathIcon, { backgroundColor: path.color }]}>
                      <Ionicons name={path.icon as keyof typeof Ionicons.glyphMap} size={20} color="#FFF" />
                    </View>
                    <Text style={[s.gradPathLabel, { color: path.color }]}>{path.label}</Text>
                  </View>
                  {path.options.map((opt, i) => (
                    <View key={i} style={[s.optionRow, { borderBottomColor: colors.border }]}>
                      <View style={[s.optionBullet, { backgroundColor: path.color }]} />
                      <View style={s.optionText}>
                        <Text style={[s.optionName, { color: colors.text }]}>{opt.name}</Text>
                        <Text style={[s.optionNote, { color: colors.mutedForeground }]}>{opt.note}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
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
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 18, gap: 12 },
  streamCard: { borderRadius: 16, borderWidth: 1.5, padding: 16 },
  streamCardHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  streamDot: { width: 10, height: 10, borderRadius: 5 },
  streamName: { flex: 1, fontSize: 16, fontFamily: "Inter_600SemiBold" },
  streamBody: { marginTop: 14, gap: 8 },
  streamDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  subHeading: { fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5, marginTop: 6 },
  careerItem: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 22 },
  prosRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  prosBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  prosBadgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  infoCard: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 4 },
  infoCardTitle: { fontSize: 16, fontFamily: "Inter_700Bold" },
  infoCardHint: { fontSize: 12, fontFamily: "Inter_400Regular" },
  degreeCard: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 12, borderWidth: 1, padding: 14 },
  degreeIndex: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  degreeIndexText: { fontSize: 13, fontFamily: "Inter_700Bold", color: "#FFF" },
  degreeText: { flex: 1, gap: 2 },
  degreeName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  degreeNote: { fontSize: 12, fontFamily: "Inter_400Regular" },
  gradPathCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  gradPathHeader: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  gradPathIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  gradPathLabel: { fontSize: 16, fontFamily: "Inter_700Bold" },
  optionRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1 },
  optionBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },
  optionText: { flex: 1, gap: 2 },
  optionName: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  optionNote: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
