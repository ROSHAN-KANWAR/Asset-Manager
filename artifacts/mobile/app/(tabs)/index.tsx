import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type Language, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";
import { useTranslations } from "@/hooks/useTranslations";

export default function RegistrationScreen() {
  const colors = useColors();
  const t = useTranslations();
  const rt = t.registration;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, setLanguage, setProfile } = useCareer();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});
  const ageRef = useRef<TextInput>(null);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  function handleLang(lang: Language) {
    Haptics.selectionAsync();
    setLanguage(lang);
  }

  function validate(): boolean {
    const e: { name?: string; age?: string } = {};
    if (!name.trim()) {
      e.name = rt.errors.nameRequired;
    }
    const ageNum = parseInt(age, 10);
    if (!age.trim()) {
      e.age = rt.errors.ageRequired;
    } else if (isNaN(ageNum) || ageNum < 10 || ageNum > 60) {
      e.age = rt.errors.ageInvalid;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleGetStarted() {
    if (!validate()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setProfile(name.trim(), age.trim());
    router.push("/welcome");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                style={[styles.langBtn, language === lang && styles.langBtnActive]}
              >
                <Text
                  style={[
                    styles.langBtnText,
                    { color: language === lang ? "#0A2463" : "rgba(255,255,255,0.8)" },
                  ]}
                >
                  {t.lang[lang]}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.headerContent}>
            <View style={styles.iconBadge}>
              <Ionicons name="flash" size={30} color="#10B981" />
            </View>
            <Text style={styles.appTitle}>{rt.title}</Text>
            <Text style={styles.appSubtitle}>{rt.subtitle}</Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Name field */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              {rt.nameLabel}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.name ? colors.destructive : colors.border,
                },
              ]}
            >
              <Ionicons name="person-outline" size={18} color={colors.mutedForeground} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder={rt.namePlaceholder}
                placeholderTextColor={colors.mutedForeground}
                value={name}
                onChangeText={(v) => {
                  setName(v);
                  setErrors((e) => ({ ...e, name: undefined }));
                }}
                returnKeyType="next"
                onSubmitEditing={() => ageRef.current?.focus()}
                autoCapitalize="words"
              />
            </View>
            {errors.name && (
              <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.name}</Text>
            )}
          </View>

          {/* Age field */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              {rt.ageLabel}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.age ? colors.destructive : colors.border,
                },
              ]}
            >
              <Ionicons name="calendar-outline" size={18} color={colors.mutedForeground} />
              <TextInput
                ref={ageRef}
                style={[styles.input, { color: colors.text }]}
                placeholder={rt.agePlaceholder}
                placeholderTextColor={colors.mutedForeground}
                value={age}
                onChangeText={(v) => {
                  setAge(v.replace(/[^0-9]/g, ""));
                  setErrors((e) => ({ ...e, age: undefined }));
                }}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={handleGetStarted}
                maxLength={2}
              />
            </View>
            {errors.age && (
              <Text style={[styles.errorText, { color: colors.destructive }]}>{errors.age}</Text>
            )}
          </View>

          {/* Privacy note */}
          <View style={[styles.privacyCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} style={{ marginTop: 1 }} />
            <Text style={[styles.privacyText, { color: colors.mutedForeground }]}>{rt.privacy}</Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: bottomPadding + 16, backgroundColor: colors.background, borderTopColor: colors.border },
          ]}
        >
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.startBtn,
              { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
          >
            <Text style={styles.startBtnText}>{rt.getStarted}</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 26 },
  langRow: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 3,
    marginBottom: 18,
  },
  langBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 17 },
  langBtnActive: { backgroundColor: "#FFFFFF" },
  langBtnText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  headerContent: { alignItems: "center", gap: 10 },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  appTitle: { fontSize: 26, fontFamily: "Inter_700Bold", color: "#FFFFFF", letterSpacing: -0.3 },
  appSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 20,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 28 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 8, letterSpacing: 0.2 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  input: { flex: 1, fontSize: 16, fontFamily: "Inter_400Regular" },
  errorText: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 5 },
  privacyCard: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
    alignItems: "flex-start",
  },
  privacyText: { flex: 1, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
  },
  startBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold", color: "#FFFFFF" },
});
