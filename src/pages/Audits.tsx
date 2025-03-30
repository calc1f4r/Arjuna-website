
import React from 'react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import { Button } from '@/components/ui/button';
import GlowingCard from '@/components/ui/aceternity/GlowingCard';
import { Shield, FileText, Search, Filter, ArrowUpDown } from 'lucide-react';

const auditReports = [
  {
    id: 1,
    projectName: "SolanaSwap Protocol",
    category: "DeFi",
    platform: "Solana",
    date: "June 15, 2023",
    severity: "High",
    status: "Completed",
    findings: 8,
  },
  {
    id: 2,
    projectName: "RustFi Lending",
    category: "Lending",
    platform: "Solana",
    date: "May 28, 2023",
    severity: "Medium",
    status: "Completed",
    findings: 5,
  },
  {
    id: 3,
    projectName: "NFT Marketplace",
    category: "NFT",
    platform: "Solana",
    date: "May 10, 2023",
    severity: "Low",
    status: "Completed",
    findings: 3,
  },
  {
    id: 4,
    projectName: "DeFi Vault",
    category: "DeFi",
    platform: "Rust",
    date: "April 22, 2023",
    severity: "Critical",
    status: "Completed",
    findings: 12,
  },
  {
    id: 5,
    projectName: "Governance Protocol",
    category: "DAO",
    platform: "Solana",
    date: "April 5, 2023",
    severity: "Medium",
    status: "Completed",
    findings: 6,
  },
  {
    id: 6,
    projectName: "Cross-Chain Bridge",
    category: "Bridge",
    platform: "Rust/Solana",
    date: "March 18, 2023",
    severity: "High",
    status: "Completed",
    findings: 9,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500/20 text-red-500';
    case 'High':
      return 'bg-orange-500/20 text-orange-500';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'Low':
      return 'bg-green-500/20 text-green-500';
    default:
      return 'bg-blue-500/20 text-blue-500';
  }
};

const Audits = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <GridBackgroundDemo className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-2 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Audit Reports</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Browse our comprehensive security audits of blockchain projects
              across the Solana and Rust ecosystems.
            </p>
          </div>
        </div>
      </GridBackgroundDemo>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          {/* Info Panel */}
          <GlowingCard className="mb-12">
            <div className="p-2 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FileText className="text-primary mr-2 h-5 w-5" />
                <span>
                  All audit reports include detailed vulnerability assessments and remediation recommendations
                </span>
              </div>
              <Button>Request an Audit</Button>
            </div>
          </GlowingCard>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search audits..."
                className="pl-10 pr-4 py-2 rounded-md bg-secondary/20 border border-border w-full md:w-80 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" /> Sort
              </Button>
            </div>
          </div>

          {/* Audit Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditReports.map((audit) => (
              <div 
                key={audit.id} 
                className="glass-card rounded-xl p-6 transition-all hover:scale-[1.02] hover:bg-secondary/30 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {audit.platform}
                  </span>
                  <span className="text-xs text-muted-foreground">{audit.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{audit.projectName}</h3>
                <p className="text-sm text-muted-foreground mb-4">Category: {audit.category}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-xs mr-2">Severity:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(audit.severity)}`}>
                      {audit.severity}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                    {audit.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {audit.findings} findings identified
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary/10 text-primary">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="mx-2">...</span>
              <Button variant="outline" size="sm">10</Button>
              <Button variant="outline" size="sm">Next</Button>
            </nav>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Security Audit?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact our team to discuss your project needs and get a custom quote for our comprehensive audit services.
          </p>
          <Button size="lg" className="px-8">Get in Touch</Button>
        </div>
      </section>
    </div>
  );
};

export default Audits;
