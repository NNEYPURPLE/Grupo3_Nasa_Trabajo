import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radii, shadows } from "../design";
import { AppHeader } from "../components/common/AppHeader";
import { FadeInView } from "../components/common/FadeInView";
import { useAnimationPress } from "../hooks/useAnimationPress";
import { triviaQuestions, type TriviaQuestion } from "../data/mockData";

const OPTION_LABELS = ["A", "B", "C", "D"];

const OptionButton = ({
  label,
  option,
  index,
  isSelected,
  isCorrect,
  selectedAnswer,
  onPress,
}: {
  label: string;
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  selectedAnswer: number | null;
  onPress: () => void;
}) => {
  const { scaleAnim, handlePressIn, handlePressOut } = useAnimationPress({
    scaleValue: 0.97,
  });

  let bgColor: string = colors.background.card;
  let borderColor: string = colors.border.subtle;
  if (selectedAnswer !== null) {
    if (isCorrect) {
      bgColor = colors.status.success + "18";
      borderColor = colors.status.success;
    } else if (isSelected) {
      bgColor = colors.status.error + "18";
      borderColor = colors.status.error;
    }
  }

  return (
    <View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={selectedAnswer !== null}
        activeOpacity={0.75}
        accessible={true}
        accessibilityRole="radio"
        accessibilityLabel={`Opción ${label}`}
        accessibilityHint={option}
        accessibilityState={{ 
          selected: isSelected,
          disabled: selectedAnswer !== null 
        }}
        style={{
          backgroundColor: bgColor,
          borderWidth: 1.5,
          borderColor,
          padding: spacing.lg,
          borderRadius: radii.lg,
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
          opacity:
            selectedAnswer !== null && !isSelected && !isCorrect ? 0.45 : 1,
          minHeight: 56,
        }}
      >
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: isSelected
              ? isCorrect
                ? colors.status.success
                : colors.status.error
              : colors.background.surface,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: isSelected ? colors.text.primary : colors.text.secondary,
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            {label}
          </Text>
        </View>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 15,
            flex: 1,
            lineHeight: 22,
          }}
          allowFontScaling={true}
          maxFontSizeMultiplier={1.2}
        >
          {option}
        </Text>
        {selectedAnswer !== null && isCorrect && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.status.success}
          />
        )}
        {selectedAnswer !== null && isSelected && !isCorrect && (
          <Ionicons
            name="close-circle"
            size={24}
            color={colors.status.error}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const GameScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const totalQuestions = triviaQuestions.length;
  const question: TriviaQuestion = triviaQuestions[currentIndex];

  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);
      if (index === question.correctAnswer) {
        setScore((s) => s + 1);
      }
      setTimeout(() => setShowResult(true), 600);
    },
    [selectedAnswer, question]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  }, [currentIndex, totalQuestions]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setFinished(false);
  }, []);

  if (finished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const message =
      percentage >= 70
        ? "¡Excelente!"
        : percentage >= 40
        ? "Bien hecho"
        : "Sigue intentando";
    const icon =
      percentage >= 70
        ? "trophy"
        : percentage >= 40
        ? "happy"
        : "sad";

    return (
      <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
        <AppHeader title="Trivia Espacial" />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: spacing.xxxl,
          }}
        >
          <FadeInView direction="none" duration={600}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor:
                  percentage >= 70
                    ? colors.status.success + "20"
                    : percentage >= 40
                    ? colors.status.warning + "20"
                    : colors.status.error + "20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={icon as any}
                size={56}
                color={
                  percentage >= 70
                    ? colors.status.success
                    : percentage >= 40
                    ? colors.status.warning
                    : colors.status.error
                }
              />
            </View>
          </FadeInView>

          <FadeInView delay={200} direction="up">
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 28,
                fontWeight: "700",
                marginTop: spacing.xl,
                textAlign: "center",
              }}
            >
              {message}
            </Text>
          </FadeInView>

          <FadeInView delay={400} direction="up">
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 18,
                marginTop: spacing.md,
              }}
            >
              Puntuación: {score} / {totalQuestions}
            </Text>
          </FadeInView>

          <FadeInView delay={500} direction="up">
            <View
              style={{
                width: 220,
                height: 8,
                backgroundColor: colors.background.surface,
                borderRadius: 4,
                marginTop: spacing.lg,
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={{
                  width: `${percentage}%`,
                  height: 8,
                  backgroundColor:
                    percentage >= 70
                      ? colors.status.success
                      : percentage >= 40
                      ? colors.status.warning
                      : colors.status.error,
                  borderRadius: 4,
                }}
              />
            </View>
          </FadeInView>

          <FadeInView delay={700} direction="up">
            <TouchableOpacity
              onPress={handleRestart}
              activeOpacity={0.85}
              style={{
                marginTop: spacing.xxxl + 4,
                backgroundColor: colors.nasa.blue,
                paddingHorizontal: 44,
                paddingVertical: spacing.md + 2,
                borderRadius: radii.lg,
                ...shadows.md,
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Jugar de nuevo
              </Text>
            </TouchableOpacity>
          </FadeInView>
        </ScrollView>
      </View>
    );
  }

  if (!question) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <AppHeader title="Trivia Espacial" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.huge }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FadeInView direction="none">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: spacing.md,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
              }}
            >
              <Text style={{ color: colors.text.muted, fontSize: 13 }}>
                Pregunta {currentIndex + 1}
              </Text>
              <Text style={{ color: colors.text.muted, fontSize: 13 }}>
                de {totalQuestions}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: colors.background.surface,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: radii.full,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={colors.status.success}
              />
              <Text
                style={{
                  color: colors.status.success,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {score}
              </Text>
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={100}>
          <View
            style={{
              height: 5,
              backgroundColor: colors.background.surface,
              borderRadius: 3,
              marginBottom: spacing.xxl,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                height: 5,
                backgroundColor: colors.nasa.blue,
                borderRadius: 3,
              }}
            />
          </View>
        </FadeInView>

        {question.imageUrl && (
          <FadeInView delay={150} distance={12}>
              <Image
                source={question.imageUrl}
                style={{
                  width: "100%",
                  height: 190,
                  borderRadius: radii.lg,
                  marginBottom: spacing.xl,
                }}
                contentFit="cover"
                transition={400}
                accessibilityLabel={`Imagen relacionada con la pregunta`}
              />
          </FadeInView>
        )}

        <FadeInView delay={200} distance={12}>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 19,
              fontWeight: "700",
              marginBottom: spacing.xxl,
              lineHeight: 28,
            }}
          >
            {question.question}
          </Text>
        </FadeInView>

        <View style={{ gap: spacing.md }}>
          {question.options.map((option, index) => (
            <FadeInView
              key={index}
              delay={300 + index * 80}
              distance={12}
              direction="left"
            >
              <OptionButton
                label={OPTION_LABELS[index]}
                option={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === question.correctAnswer}
                selectedAnswer={selectedAnswer}
                onPress={() => handleSelectAnswer(index)}
              />
            </FadeInView>
          ))}
        </View>

        {showResult && (
          <FadeInView delay={200} direction="up">
            <View
              style={{
                marginTop: spacing.xxl,
                backgroundColor: colors.background.surface,
                borderRadius: radii.lg,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: colors.border.subtle,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
                <Ionicons
                  name={selectedAnswer === question.correctAnswer ? "checkmark-circle" : "close-circle"}
                  size={20}
                  color={selectedAnswer === question.correctAnswer ? colors.status.success : colors.status.error}
                />
                <Text
                  style={{
                    color: selectedAnswer === question.correctAnswer ? colors.status.success : colors.status.error,
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  {selectedAnswer === question.correctAnswer ? "¡Correcto!" : "Incorrecto"}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  lineHeight: 21,
                }}
              >
                {question.explanation}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.85}
              style={{
                marginTop: spacing.lg,
                backgroundColor: colors.nasa.blue,
                paddingVertical: spacing.lg,
                borderRadius: radii.lg,
                alignItems: "center",
                ...shadows.glow,
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {currentIndex + 1 < totalQuestions
                  ? "Siguiente pregunta"
                  : "Ver resultados"}
              </Text>
            </TouchableOpacity>
          </FadeInView>
        )}
      </ScrollView>
    </View>
  );
};

export default GameScreen;
