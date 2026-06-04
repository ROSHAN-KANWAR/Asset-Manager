import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type EducationLevel, type Language, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";
import { useTranslations } from "@/hooks/useTranslations";

export default function WelcomeScreen() {
  const colors = useColors();
  const t = useTranslations();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, language, setEducationLevel, setLanguage } = useCareer();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  function handleLang(lang: Language) {
    Haptics.selectionAsync();
    setLanguage(lang);
  }

  function handleSelect(level: EducationLevel) {
    Haptics.selectionAsync();
    setEducationLevel(level);
  }

  function handleContinue() {
    if (!educationLevel) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/academic");
  }

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const LEVELS = (["10th", "12th", "graduate"] as EducationLevel[]);
  const ICONS: Record<EducationLevel, keyof typeof Ionicons.glyphMap> = {
    "10th": "school-outline",
    "12th": "book-outline",
    graduate: "ribbon-outline",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={["#0A2463", "#1B3B9C"]}
        style={[styles.header, { paddingTop: topPadding + 16 }]}
      >
        {/* Language toggle */}
        <View style={styles.langRow}>
          {(["en", "hi"] as Language[]).map((lang) => (
            <Pressable
              key={lang}
              onPress={() => handleLang(lang)}
              style={[
                styles.langBtn,
                language === lang && styles.langBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.langBtnText,
                  { color: language === lang ? "#0A2463" : "rgba(255,255,255,0.75)" },
                ]}
              >
                {t.lang[lang]}
              </Text>
            </Pressable>
          ))}
        </View>

        <Animated.View
          style={[styles.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.iconBadge}>
            <Ionicons name="flash" size={32} color="#10B981" />
          </View>
          <Text style={styles.appTitle}>{t.welcome.title}</Text>
          <Text style={styles.appSubtitle}>{t.welcome.subtitle}</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
            {t.welcome.selectLevel}
          </Text>

          {LEVELS.map((levelId) => {
            const info = t.welcome.levels[levelId];
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
                  <Ionicons
                    name={ICONS[levelId]}
                    size={24}
                    color={selected ? "#FFFFFF" : colors.primary}
                  />
                </View>
                <View style={styles.levelText}>
                  <View style={styles.levelTitleRow}>
                    <Text style={[styles.levelLabel, { color: selected ? "#FFFFFF" : colors.text }]}>
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
                      styles.levelDescription,
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
        </Animated.View>
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
          <Text
            style={[
              styles.continueBtnText,
              { color: educationLevel ? "#FFFFFF" : colors.mutedForeground },
            ]}
          >
            {t.welcome.continue}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={educationLevel ? "#FFFFFF" : colors.mutedForeground}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 28 },
  langRow: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 6,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 3,
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 17,
  },
  langBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  langBtnText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  headerContent: { alignItems: "center", gap: 10 },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  appTitle: {
    fontSize: 27,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
  appSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 20,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 22 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.1,
    marginBottom: 14,
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 12,
  },
  levelIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: { flex: 1, gap: 2 },
  levelTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  levelLabel: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
  levelSublabel: { fontSize: 12, fontFamily: "Inter_400Regular" },
  levelDescription: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
  },
  continueBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold" },
});
