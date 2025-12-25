import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

type Props = {
  name: string;
  email?: string;
  phone?: string;
  resumeText: string;
};

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  section: { marginBottom: 10 },
  text: { lineHeight: 1.4 },
});

export default function ResumePDF({ name, email, phone, resumeText }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        {email && <Text>{email}</Text>}
        {phone && <Text>{phone}</Text>}

        <Text style={{ marginTop: 20, fontWeight: "bold" }}>Resume:</Text>
        <Text style={styles.text}>{resumeText}</Text>
      </Page>
    </Document>
  );
}
