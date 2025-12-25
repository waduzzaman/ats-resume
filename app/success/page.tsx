import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface Props {
  name: string;
  resumeText: string;
  missingKeywords: string[];
}

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11 },
  title: { fontSize: 18, marginBottom: 10 },
  section: { marginTop: 12 },
});

export default function ResumePDF({
  name,
  resumeText,
  missingKeywords,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.section}>
          <Text>{resumeText}</Text>
        </View>

        {missingKeywords.length > 0 && (
          <View style={styles.section}>
            <Text>Missing Keywords:</Text>
            {missingKeywords.map((k, i) => (
              <Text key={i}>• {k}</Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
