"use client"
import { useState } from "react";
import InputForm from "./components/InputForm";

const HomePage = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-full text-center md:text-justify m-8 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6 text-blue-500 shadow-xl">
            Welcome to our DNA Analysis Platform
          </h1>
          <p className="text-lg text-white mb-8">
            A genome is a complete collection of DNA in an organism. All living
            species possess a genome, but they differ considerably in size. The
            human genome, for instance, is arranged into 23 chromosomes, which
            is a little bit like an encyclopedia being organized into 23
            volumes. And if you counted all the characters (individual DNA
            “base pairs”), there would be more than 6 billion in each human
            genome. So it’s a huge compilation.
          </p>
          <h2 className="text-3xl font-bold mb-4 text-blue-500">
            What is our project exactly?
          </h2>
          <p className="text-lg text-white mb-8">
            K-mer counting, likening DNA sequences to language, is pivotal in
            genetic analysis. Just as natural language processing deciphers
            human languages, we apply similar principles to decode the genetic
            code. Sequences are broken into overlapping "words" of a fixed
            length (e.g., hexamers). For instance, "ATGCATGCA" becomes
            'ATGCAT', 'TGCATG', 'GCATGC', and 'CATGCA'. Python's NLP tools
            facilitate implementation. Optimizing word length and overlap is
            crucial for mutation detection, gene classification, and model
            analysis. K-mer counting unveils genetic complexities, driving
            advancements from personalized medicine to evolutionary biology.
          </p>
          <p className="text-lg text-white mb-8">
            Genomic medicine leverages genetic information to inform disease
            prevention, diagnosis, and treatment decisions. By analyzing an
            individual's genome, healthcare professionals can identify genetic
            variants associated with specific diseases or conditions, enabling
            early detection, targeted screening, and personalized treatment
            strategies. This approach has the potential to revolutionize
            healthcare by providing a more proactive and personalized approach
            to disease management. When applied to genomic data, AI algorithms
            can sift through vast genomic datasets, identifying meaningful
            genetic variants and extracting actionable insights that inform
            clinical decision-making. AI can assist in identifying patterns
            and associations between genetic variants and disease phenotypes,
            enabling more accurate diagnosis and personalized treatment plans.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 text-center shadow-lg hover:shadow-xl">
          <img
            src="dna.jpg"
            alt="DNA Structure"
            className="w-full rounded-2xl shadow-xl"
          />
          <figcaption className="text-sm text-gray-300 mt-2">Figure: DNA Structure</figcaption>
        </div>
      </div>
    </div>
  );
};

export default HomePage;