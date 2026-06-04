import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type AcademicData, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";
import { useTranslations } from "@/hooks/useTranslations";

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "History", "Geography", "Computer Science",
  "Economics", "Hindi", "Political Science", "Psychology",
];

function ProgressBar({ step, total, colors }: { step: number; total: number; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[pb.wrap, { backgroundColor: colors.muted }]}>
      <View style={[pb.fill, { backgroundColor: colors.accent, width: `${(step / total) * 100}%` as `${number}%` }]} />
    </View>
  );
}
const pb = StyleSheet.create({ wrap: { height: 4, borderRadius: 2, marginHorizontal: 20, marginBottom: 4 }, fill: { height: "100%", borderRadius: 2 } });

export default function AcademicScreen() {
  const colors = useColors();
  const t = useTranslations();
  const at = t.academic;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, academicData, setAcademicData } = useCareer();

  const [form, setForm] = useState<AcademicData>({ ...academicData });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  function updateField(key: keyof AcademicData, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function toggleSubject(subject: string) {
    Haptics.selectionAsync();
    const curr = form.favoriteSubjects ?? [];
    setForm((p) => ({
      ...p,
      favoriteSubjects: curr.includes(subject)
        ? curr.filter((s) => s !== subject)
        : [...curr, subject],
    }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    const marks10 = parseFloat(form.marks10 ?? "");
    if (!form.marks10?.trim()) e["marks10"] = at.errors.marks10Required;
    else if (isNaN(marks10) || marks10 < 1 || marks10 > 100) e["marks10"] = at.errors.marks10Invalid;

    if (educationLevel === "12th" || educationLevel === "graduate") {
      const marks12 = parseFloat(form.marks12 ?? "");
      if (!form.marks12?.trim()) e["marks12"] = at.errors.marks12Required;
      else if (isNaN(marks12) || marks12 < 1 || marks12 > 100) e["marks12"] = at.errors.marks12Invalid;
      if (!form.stream12) e["stream12"] = at.errors.stream12Required;
    }
    if (educationLevel === "graduate") {
      if (!form.degreeName?.trim()) e["degreeName"] = at.errors.degreeRequired;
      if (!form.cgpa?.trim()) e["cgpa"] = at.errors.cgpaRequired;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAcademicData(form);
    router.push("/interests");
  }

  const levelBadgeLabel = educationLevel
    ? t.welcome.levels[educationLevel].label
    : "";

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.topBar, { paddingTop: topPadding + 8 }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={s.topCenter}>
          <Text style={[s.stepLabel, { color: colors.mutedForeground }]}>{at.step}</Text>
          <Text style={[s.screenTitle, { color: colors.text }]}>{at.title}</Text>
        </View>
        <View style={[s.levelBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[s.levelBadgeText, { color: colors.primary }]}>{levelBadgeLabel}</Text>
        </View>
      </View>
      <ProgressBar step={1} total={3} colors={colors} />

      <KeyboardAwareScrollView
        style={s.scroll}
        contentContainerStyle={[s.content, { paddingBottom: bottomPadding + 100 }]}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
      >
        <Field
          label={at.marks10Label}
          placeholder={at.marks10Placeholder}
          value={form.marks10 ?? ""}
          onChangeText={(v) => updateField("marks10", v)}
          error={errors["marks10"]}
          keyboardType="decimal-pad"
          colors={colors}
        />

        {(educationLevel === "12th" || educationLevel === "graduate") && (
          <>
            <Field
              label={at.marks12Label}
              placeholder={at.marks12Placeholder}
              value={form.marks12 ?? ""}
              onChangeText={(v) => updateField("marks12", v)}
              error={errors["marks12"]}
              keyboardType="decimal-pad"
              colors={colors}
            />
            <View style={s.fieldGroup}>
              <Text style={[s.fieldLabel, { color: colors.mutedForeground }]}>{at.stream12Label}</Text>
              <View style={s.streamGrid}>
                {at.streams.map((stream) => {
                  const active = form.stream12 === stream.value;
                  return (
                    <Pressable
                      key={stream.value}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setForm((p) => ({ ...p, stream12: stream.value }));
                        setErrors((p) => ({ ...p, stream12: "" }));
                      }}
                      style={[
                        s.streamBtn,
                        { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border },
                      ]}
                    >
                      <Text style={[s.streamBtnText, { color: active ? "#FFF" : colors.text }]}>
                        {stream.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors["stream12"] && (
                <Text style={[s.errorText, { color: colors.destructive }]}>{errors["stream12"]}</Text>
              )}
            </View>
          </>
        )}

        {educationLevel === "graduate" && (
          <>
            <Field label={at.degreeLabel} placeholder={at.degreePlaceholder} value={form.degreeName ?? ""} onChangeText={(v) => updateField("degreeName", v)} error={errors["degreeName"]} colors={colors} />
            <Field label={at.specializationLabel} placeholder={at.specializationPlaceholder} value={form.specialization ?? ""} onChangeText={(v) => updateField("specialization", v)} colors={colors} />
            <Field label={at.cgpaLabel} placeholder={at.cgpaPlaceholder} value={form.cgpa ?? ""} onChangeText={(v) => updateField("cgpa", v)} error={errors["cgpa"]} keyboardType="decimal-pad" colors={colors} />
          </>
        )}

        <View style={s.fieldGroup}>
          <Text style={[s.fieldLabel, { color: colors.mutedForeground }]}>{at.subjectsLabel}</Text>
          <View style={s.chipsWrap}>
            {SUBJECTS.map((sub) => {
              const active = (form.favoriteSubjects ?? []).includes(sub);
              return (
                <Pressable
                  key={sub}
                  onPress={() => toggleSubject(sub)}
                  style={[s.chip, { backgroundColor: active ? colors.primary : colors.secondary, borderColor: active ? colors.primary : colors.border }]}
                >
                  <Text style={[s.chipText, { color: active ? "#FFF" : colors.text }]}>{sub}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={[s.footer, { paddingBottom: bottomPadding + 16, borderTopColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [s.nextBtn, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
        >
          <Text style={s.nextBtnText}>{at.next}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
}

function Field({
  label, placeholder, value, onChangeText, error, keyboardType, colors,
}: {
  label: string; placeholder: string; value: string; onChangeText: (v: string) => void;
  error?: string; keyboardType?: "default" | "decimal-pad"; colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={s.fieldGroup}>
      <Text style={[s.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <TextInput
        style={[s.input, { backgroundColor: colors.card, borderColor: error ? colors.destructive : colors.border, color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
      />
      {error && <Text style={[s.errorText, { color: colors.destructive }]}>{error}</Text>}
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
  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  levelBadgeText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 8, letterSpacing: 0.2 },
  input: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, fontFamily: "Inter_400Regular" },
  errorText: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 4 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  streamGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  streamBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5 },
  streamBtnText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, paddingTop: 12, paddingHorizontal: 20, borderTopWidth: 1 },
  nextBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 16 },
  nextBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold", color: "#FFFFFF" },
});
