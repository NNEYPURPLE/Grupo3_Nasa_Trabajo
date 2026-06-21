import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "../../design";

interface RoverCameraFilterProps {
  cameras: string[];
  selectedCamera: string | null;
  onSelectCamera: (camera: string | null) => void;
}

const CAMERA_LABELS: Record<string, string> = {
  ALL: "All",
  FHAZ: "Front Hazard",
  RHAZ: "Rear Hazard",
  MAST: "Mast",
  CHEMCAM: "ChemCam",
  MAHLI: "MAHLI",
  MARDI: "MARDI",
  NAVCAM: "Navigation",
  PANCAM: "Panoramic",
  MINITES: "MiniTES",
};

export const RoverCameraFilter = ({
  cameras,
  selectedCamera,
  onSelectCamera,
}: RoverCameraFilterProps) => {
  return (
    <View style={{ paddingVertical: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
      >
        <TouchableOpacity
          onPress={() => onSelectCamera(null)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: !selectedCamera
              ? colors.nasa.blue
              : colors.background.surface,
          }}
        >
          <Text
            style={{
              color: !selectedCamera ? colors.text.primary : colors.text.secondary,
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            All
          </Text>
        </TouchableOpacity>
        {cameras.map((camera) => {
          const isSelected = selectedCamera === camera;
          return (
            <TouchableOpacity
              key={camera}
              onPress={() => onSelectCamera(camera)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isSelected
                  ? colors.nasa.blue
                  : colors.background.surface,
              }}
            >
              <Text
                style={{
                  color: isSelected ? colors.text.primary : colors.text.secondary,
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                {CAMERA_LABELS[camera] || camera}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
