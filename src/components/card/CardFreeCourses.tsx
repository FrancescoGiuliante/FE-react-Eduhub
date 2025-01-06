import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";

export function CardFreeCourses() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="bg-blue-100 border-b px-6 py-4">
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-3xl font-bold text-blue-600">Free courses for you</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Bookmark className="mr-1 h-4 w-4" />
            <span>Explore the best free courses available for you!</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="blockchain" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="blockchain">Blockchain Development</TabsTrigger>
            <TabsTrigger value="software-engineering">Software Engineering</TabsTrigger>
          </TabsList>
          
          {/* Tab Content for Blockchain */}
          <TabsContent value="blockchain">
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">Blockchain Development</h1>
              <p className="text-sm text-gray-700">
                Blockchain technology is revolutionizing the way we store, share, and validate data in a secure and decentralized manner. 
                In this course, you'll delve into the core principles of blockchain and learn how to develop decentralized applications 
                (DApps) on popular blockchain platforms like Ethereum.
              </p>

              <h2 className="text-xl font-semibold mt-4">Understanding Blockchain Fundamentals</h2>
              <p className="text-sm text-gray-600">
                Blockchain is a distributed ledger technology that allows data to be stored across multiple computers in such a way 
                that it ensures transparency, security, and immutability. It is the underlying technology behind cryptocurrencies 
                such as Bitcoin and Ethereum, but its applications go far beyond just financial transactions.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>The structure of a blockchain: blocks, chains, and hashes</li>
                <li>How decentralized networks work and why they are more secure</li>
                <li>Consensus algorithms: Proof of Work (PoW), Proof of Stake (PoS), and more</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Smart Contracts and Decentralized Applications (DApps)</h2>
              <p className="text-sm text-gray-600">
                A key feature of blockchain platforms like Ethereum is the ability to create and deploy smart contracts — 
                self-executing contracts where the terms of the agreement are written directly into code. This enables automated, 
                trustless transactions between parties. In this course, you'll learn how to write smart contracts using Solidity 
                and deploy them on the Ethereum network.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Smart contracts: what they are and how they work</li>
                <li>Developing smart contracts using the Solidity programming language</li>
                <li>Building decentralized applications (DApps) on Ethereum</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Blockchain Use Cases and Real-World Applications</h2>
              <p className="text-sm text-gray-600">
                Blockchain is transforming industries beyond just finance. From supply chain management to healthcare, voting systems, 
                and identity verification, blockchain’s potential to improve security and efficiency is vast. Throughout the course, 
                you'll explore real-world use cases and learn how to design and implement blockchain-based solutions for various sectors.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Blockchain for supply chain transparency and traceability</li>
                <li>Using blockchain for secure voting systems</li>
                <li>Healthcare data management with blockchain</li>
                <li>Creating a decentralized marketplace with smart contracts</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* Tab Content for Software Engineering */}
          <TabsContent value="software-engineering">
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">Software Engineering</h1>
              <p className="text-sm text-gray-700">
                Software engineering involves applying engineering principles to the development of software systems. It covers a broad range 
                of topics, from design and implementation to testing and maintenance. This course introduces you to the software development 
                lifecycle, including methodologies like Agile, and equips you with the skills to create high-quality software solutions.
              </p>

              <h2 className="text-xl font-semibold mt-4">The Software Development Lifecycle (SDLC)</h2>
              <p className="text-sm text-gray-600">
                The SDLC is a process used by software developers to design, develop, and maintain software systems. It encompasses several stages, 
                including requirement analysis, system design, implementation, testing, deployment, and maintenance.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Understanding the stages of the software development lifecycle</li>
                <li>Importance of requirement analysis and system design</li>
                <li>Implementation and coding best practices</li>
                <li>Testing methods: unit testing, integration testing, and acceptance testing</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Agile Methodology</h2>
              <p className="text-sm text-gray-600">
                Agile is a popular software development methodology that emphasizes flexibility, collaboration, and customer feedback. It focuses 
                on delivering small, incremental improvements to a software product over time, rather than aiming for a large, monolithic release.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>The Agile manifesto and its principles</li>
                <li>Scrum methodology: roles, sprints, and ceremonies</li>
                <li>Kanban methodology: managing workflows and tasks</li>
                <li>Collaborating with cross-functional teams</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Design Patterns and Software Architecture</h2>
              <p className="text-sm text-gray-600">
                As software systems grow in complexity, it becomes essential to apply proven design patterns and architectural principles to 
                ensure the system remains maintainable and scalable. In this section, you'll learn about common design patterns such as Singleton, 
                Factory, and Observer, and how they are applied in software engineering.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Common design patterns: Singleton, Factory, and Observer</li>
                <li>Software architecture principles: modularity, scalability, and reusability</li>
                <li>Layered architecture and separation of concerns</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Software Testing and Quality Assurance</h2>
              <p className="text-sm text-gray-600">
                Software testing is crucial to ensure the quality and functionality of software. This section will cover different types of testing, 
                such as unit testing, integration testing, and end-to-end testing, as well as methods for automating tests to improve efficiency and 
                consistency.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Unit testing frameworks and tools</li>
                <li>Integration testing: ensuring components work together</li>
                <li>End-to-end testing: verifying complete workflows</li>
                <li>Test automation tools: Selenium, JUnit, and more</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
