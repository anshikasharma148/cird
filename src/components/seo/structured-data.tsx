type JsonLdValue = Record<string, unknown>;

type StructuredDataProps = {
  data: JsonLdValue;
  id?: string;
};

export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
