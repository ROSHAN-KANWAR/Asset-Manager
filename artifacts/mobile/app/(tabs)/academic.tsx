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
// KeyboardAwareScrollView from react-native-keyboard-controller handles form keyboard avoidance
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type AcademicData, useCareer } from "@/context/CareerContext";
import { useColors } from "@/hooks/useColors";

const STREAMS = ["Science (PCM)", "Science (PCB)", "Commerce", "Arts/Humanities"];
const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Hindi", "Political Science", "Psychology"];

function ProgressBar({ step, total }: { step: number; total: number }) {
  const colors = useColors();
  return (
    <View style={[progressStyles.container, { backgroundColor: colors.muted }]}>
      <View
        style={[
          progressStyles.fill,
          { backgroundColor: colors.accent, width: `${(step / total) * 100}%` as `${number}%` },
        ]}
      />
    </View>
  );
}

const progressStyles = StyleSheet.create({
  container: { height: 4, borderRadius: 2, marginHorizontal: 20, marginBottom: 4 },
  fill: { height: "100%", borderRadius: 2 },
});

function SubjectChips({
  selected,
  onToggle,
  colors,
}: {
  selected: string[];
  onToggle: (s: string) => void;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.chipsWrap}>
      {SUBJECTS.map((s) => {
        const active = selected.includes(s);
        return (
          <Pressable
            key={s}
            onPress={() => onToggle(s)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.secondary,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={[styles.chipText, { color: active ? "#FFFFFF" : colors.text }]}>
              {s}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function AcademicScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { educationLevel, academicData, setAcademicData } = useCareer();

  const [form, setForm] = useState<AcademicData>({ ...academicData });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  function updateField(key: keyof AcademicData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function toggleSubject(subject: string) {
    Haptics.selectionAsync();
    const curr = form.favoriteSubjects ?? [];
    const next = curr.includes(subject)
      ? curr.filter((s) => s !== subject)
      : [...curr, subject];
    setForm((prev) => ({ ...prev, favoriteSubjects: next }));
  }

  function validateMarks(val: string): boolean {
    const n = parseFloat(val);
    return !isNaN(n) && n >= 1 && n <= 100;
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!form.marks10?.trim()) {
      errs["marks10"] = "10th marks are required";
    } else if (!validateMarks(form.marks10)) {
      errs["marks10"] = "Enter a valid percentage between 1 and 100";
    }

    if (educationLevel === "12th" || educationLevel === "graduate") {
      if (!form.marks12?.trim()) {
        errs["marks12"] = "12th marks are required";
      } else if (!validateMarks(form.marks12)) {
        errs["marks12"] = "Enter a valid percentage between 1 and 100";
      }
      if (!form.stream12) {
        errs["stream12"] = "Please select your 12th stream";
      }
    }

    if (educationLevel === "graduate") {
      if (!form.degreeName?.trim()) {
        errs["degreeName"] = "Degree name is required";
      }
      if (!form.cgpa?.trim()) {
        errs["cgpa"] = "CGPA or percentage is required";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAcademicData(form);
    router.push("/interests");
  }

  const levelLabel =
    educationLevel === "10th"
      ? "10th Student"
      : educationLevel === "12th"
        ? "12th Student"
        : "Graduate";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { paddingTop: topPadding + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.topCenter}>
          <Text style={[styles.stepLabel, { color: colors.mutedForeground }]}>Step 1 of 3</Text>
          <Text style={[styles.screenTitle, { color: colors.text }]}>Academic Profile</Text>
        </View>
        <View
          style={[styles.levelBadge, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.levelBadgeText, { color: colors.primary }]}>{levelLabel}</Text>
        </View>
      </View>
      <ProgressBar step={1} total={3} />

      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
      >
        {/* 10th Marks */}
        <InputField
          label="10th Board Marks / Percentage (%)"
          placeholder="e.g. 85.5"
          value={form.marks10 ?? ""}
          onChangeText={(v) => updateField("marks10", v)}
          error={errors["marks10"]}
          keyboardType="decimal-pad"
          colors={colors}
        />

        {/* 12th fields */}
        {(educationLevel === "12th" || educationLevel === "graduate") && (
          <>
            <InputField
              label="12th Marks / Percentage (%)"
              placeholder="e.g. 78"
              value={form.marks12 ?? ""}
              onChangeText={(v) => updateField("marks12", v)}
              error={errors["marks12"]}
              keyboardType="decimal-pad"
              colors={colors}
            />
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
                12th Stream
              </Text>
              <View style={styles.streamGrid}>
                {STREAMS.map((s) => {
                  const active = form.stream12 === s;
                  return (
                    <Pressable
                      key={s}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setForm((p) => ({ ...p, stream12: s }));
                        setErrors((p) => ({ ...p, stream12: "" }));
                      }}
                      style={[
                        styles.streamBtn,
                        {
                          backgroundColor: active ? colors.primary : colors.card,
                          borderColor: active ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.streamBtnText,
                          { color: active ? "#FFF" : colors.text },
                        ]}
                      >
                        {s}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors["stream12"] && (
                <Text style={[styles.errorText, { color: colors.destructive }]}>
                  {errors["stream12"]}
                </Text>
              )}
            </View>
          </>
        )}

        {/* Graduate extra fields */}
        {educationLevel === "graduate" && (
          <>
            <InputField
              label="Graduation Degree"
              placeholder="e.g. B.Tech, B.Com, B.Sc, B.A"
              value={form.degreeName ?? ""}
              onChangeText={(v) => updateField("degreeName", v)}
              error={errors["degreeName"]}
              colors={colors}
            />
            <InputField
              label="Specialization / Major"
              placeholder="e.g. Computer Science, Finance, Biology"
              value={form.specialization ?? ""}
              onChangeText={(v) => updateField("specialization", v)}
              colors={colors}
            />
            <InputField
              label="CGPA / Percentage (%)"
              placeholder="e.g. 7.8 or 72%"
              value={form.cgpa ?? ""}
              onChangeText={(v) => updateField("cgpa", v)}
              error={errors["cgpa"]}
              keyboardType="decimal-pad"
              colors={colors}
            />
          </>
        )}

        {/* Favorite Subjects */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
            Favorite Subjects{" "}
            <Text style={{ fontFamily: "Inter_400Regular" }}>(pick any)</Text>
          </Text>
          <SubjectChips
            selected={form.favoriteSubjects ?? []}
            onToggle={toggleSubject}
            colors={colors}
          />
        </View>
      </KeyboardAwareScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: bottomPadding + 16, borderTopColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            styles.nextBtn,
            { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
        >
          <Text style={styles.nextBtnText}>Next: Interests</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType,
  colors,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  keyboardType?: "default" | "decimal-pad";
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.destructive : colors.border,
            color: colors.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
      )}
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
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelBadgeText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20, gap: 4 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  errorText: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 4 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  streamGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  streamBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  streamBtnText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
  },
  nextBtnText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
});
