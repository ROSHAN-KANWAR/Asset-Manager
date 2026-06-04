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

import { type EducationLevel, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";

interface LevelOption {
  id: EducationLevel;
  label: string;
  sublabel: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const LEVELS: LevelOption[] = [
  {
    id: "10th",
    label: "10th Student",
    sublabel: "Class X",
    icon: "school-outline",
    description: "Explore streams, diplomas & early career skills",
  },
  {
    id: "12th",
    label: "12th Student",
    sublabel: "Class XII",
    icon: "book-outline",
    description: "Discover degrees, entrance exams & career paths",
  },
  {
    id: "graduate",
    label: "Graduate",
    sublabel: "Degree Holder",
    icon: "ribbon-outline",
    description: "Find jobs, higher education & govt exam roadmaps",
  },
];

export default function WelcomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, setEducationLevel } = useCareer();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={["#0A2463", "#1B3B9C"]}
        style={[styles.header, { paddingTop: topPadding + 24 }]}
      >
        <Animated.View
          style={[styles.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.iconBadge}>
            <Ionicons name="flash" size={32} color="#10B981" />
          </View>
          <Text style={styles.appTitle}>AI Career Coach</Text>
          <Text style={styles.appSubtitle}>
            Your AI-powered guide to the perfect career path
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
            SELECT YOUR CURRENT LEVEL
          </Text>

          {LEVELS.map((level) => {
            const selected = educationLevel === level.id;
            return (
              <Pressable
                key={level.id}
                onPress={() => handleSelect(level.id)}
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
                    name={level.icon}
                    size={24}
                    color={selected ? "#FFFFFF" : colors.primary}
                  />
                </View>
                <View style={styles.levelText}>
                  <View style={styles.levelTitleRow}>
                    <Text
                      style={[
                        styles.levelLabel,
                        { color: selected ? "#FFFFFF" : colors.text },
                      ]}
                    >
                      {level.label}
                    </Text>
                    <Text
                      style={[
                        styles.levelSublabel,
                        { color: selected ? "rgba(255,255,255,0.7)" : colors.mutedForeground },
                      ]}
                    >
                      {level.sublabel}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.levelDescription,
                      { color: selected ? "rgba(255,255,255,0.8)" : colors.mutedForeground },
                    ]}
                  >
                    {level.description}
                  </Text>
                </View>
                {selected && (
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                )}
              </Pressable>
            );
          })}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPadding + 16,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
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
            Continue
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
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerContent: {
    alignItems: "center",
    gap: 12,
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 22,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.2,
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
  levelTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  levelLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  levelSublabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  levelDescription: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
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
  continueBtnText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
});
