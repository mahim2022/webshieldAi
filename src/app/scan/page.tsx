// /src/app/scan/page.tsx
import ScanForm from '@/components/ScanForm';
import ResultCard from '@/components/ResultCard';
import Layout from '@/components/Layout';


export default function ScanPage() {
  return (
  <section className="max-w-2xl mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-6">
      🛡️ Website Vulnerability Scan
    </h1>
    <Layout>
      <ScanForm />
    </Layout>
    
  </section>
);

}
