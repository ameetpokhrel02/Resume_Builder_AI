export default function ResumePreview({ data }: { data: any }) {
  // TODO: Render resume preview from data
  return (
    <div className="prose max-w-none">
      <h1>{data?.full_name || 'Full Name'}</h1>
      <p>{data?.summary || 'Professional summary goes here.'}</p>
      {/* TODO: Render experience, education, skills */}
    </div>
  );
}
