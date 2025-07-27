"use client";
/*
export interface DialogueOption {
  text: string;
  end?: boolean;
}
  */
 
export interface DialogueNode {
  message: string;
  options?: string[];
}

export interface FAQEntry {
  question: string;
  answer: string;
  keywords?: string[];
}

export interface NPCData {
  greeting: string;
  faqs: FAQEntry[];
  voice?: 'female' | 'male'; // Added to specify voice gender
}

// Renamed from npcDialogues to npcFAQs and exported correctly
export const npcFAQs: Record<string, NPCData> = {
  npc1: {
    greeting: "Hello, nice to see you!",
    faqs: [
      {
        question: "who are you?",
        answer: "iam your guide.",
        keywords: ["who are you ",]
      },
    ],
    voice: 'male'
  },
  /*****************************************************************************/
wpc2: {
    greeting: "Hello, nice to see you!",
  faqs: [
    {
      question: "What's your role?",
      answer: "I'm a virtual lab assistant.",
      keywords: ["role", "assistant"]
    },
    {
      question: "What is your name and field of study?",
      answer: "My name is Salma, and I’m majoring in Environmental Science at the Faculty of Science.",
      keywords: ["What is your name", "field of study"]
    },
    {
      question: "Why did you choose Environmental Science?",
      answer: "I want to work on sustainable solutions to climate change.",
      keywords: ["Why did you choose", "Environmental Science"]
    },
    {
      question: "What’s your opinion on carbon capture technology?",
      answer: "It’s promising, but it shouldn’t replace reducing emissions. Prevention is better than cure.",
      keywords: ["What’s your opinion", "carbon capture"]
    }
  ],
  voice: 'female'
},
  /*************************************************************************** */
wpc3: {
    greeting: "Hello, nice to see you!",
  faqs: [
    {
      question: "What’s your name and what’s your major?",
      answer: "My name is Rania, and I’m majoring in Environmental Chemistry.",
      keywords: ["What’s your name", "what’s your major"]
    },
    {
      question: "Why did you choose this field?",
      answer: "I’ve always been interested in how chemicals affect our environment. I want to help reduce pollution through green chemistry.",
      keywords: ["Why did you choose"]
    },
    {
      question: "What is your specific research interest?",
      answer: "I’m currently exploring how biodegradable materials can replace plastic in food packaging.",
      keywords: ["What is your specific", "research interest"]
    },
    {
      question: "Who is your favorite scientist and why?",
      answer: "I admire Rachel Carson. Her book Silent Spring inspired many environmental movements.",
      keywords: ["Who is your favorite scientist"]
    },
    {
      question: "What do you think about using AI in your scientific field?",
      answer: "AI is useful in analyzing large datasets for chemical modeling, but it needs careful supervision to avoid errors in environmental risk assessments.",
      keywords: ["What do you think about using", "AI in your scientific field"]
    },
    {
      question: "What scientific issue do you care most about?",
      answer: "I care a lot about water contamination and finding sustainable solutions for water purification.",
      keywords: ["What scientific issue do you"]
    }
  ],
  voice: 'female'
},
  /***************************************11111**************************************/
  prof1: {
    greeting: "Good morning, everyone. My name is Sara, and today I’ll explain how catalysts speed up chemical reactions without being consumed. As you seen on slides, the catalyst lowers the activation energy needed, making the reaction proceed faster. This process is essential in industrial chemistry, especially in the production of ammonia in the Haber process.In conclusion, catalysts are key to efficient chemical reactions and help save time and energy in various industries. Thank you!",
    faqs: [
      {
        question: "Can you give another real-world example where a catalyst is used?",
        answer: "Yes! Catalytic converters in car exhaust systems use platinum-based catalysts to reduce harmful emissions by speeding up reactions that convert toxic gases into less harmful ones. So, nanotechnology is the science of manipulating materials on an atomic or molecular scale, especially to build microscopic devices.",
        keywords: ["Can you give another real-world example", "where a catalyst is used"]
      },
      {
        question: "What do you mean by “manipulating materials”?",
        answer: "I mean changing or controlling the structure of materials to make them behave differently.",
        keywords: ["manipulating materials", "What do you mean by"]
      },
      {
        question: "Can you give an example of how it’s used?”?",
        answer: "Sure! For instance, some sunscreens use nanoparticles of zinc oxide because they go on clear and block UV rays better.",
        keywords: ["Can you give an example", "Whaof how it’s used?"]
      },
      {
        question: "Do you think this kind of cooperation is common in other ecosystems, like deserts or rainforests?",
        answer: "It may depend on the type of fungi and plant species, but it could definitely help in harsh environments.I respectfully disagree — in resource-poor environments, plants might compete more than cooperate. Maybe they block each other chemically instead?",
        keywords: ["Do you think this kind of cooperation", "is common in other ecosystems, like deserts"]
      },
      {
        question: "What is genetic editing? ",
        answer: " •Benefits: Increased crop yields, pest resistance, drought tolerance •Concerns: Biodiversity loss, ethical issues, unknown long-term effects •Real-world examples: Golden Rice, drought-resistant corn, gene-edited tomatoes in Japan",
        keywords: ["What is genetic editing",]
      },
        {
        question: "What does analyzing an article’s flow and data typically involve?",
        answer: "Understand the Article Structure Most research articles follow the IMRAD format: Introduction – introduces the topic, problem, and research aims. Methodology – explains how the data was collected and analyzed. Results – presents the findings, often with tables/figures. Discussion/Conclusion – interprets results and links them to the aims. Tip: Skim the abstract first, then the conclusion, to get the big picture before diving into details. ",
        keywords: ["What does analyzing an article’s flow and data typically involve? ", " n article’s flow and data typically involve"]
      },
              {
        question: "How can you identify the research aims or questions in an article? ",
        answer: " •What the study is trying to discover, prove, or understand. •Phrases like “This study aims to… or “The research questions are…” Example: “This study aims to investigate the impact of VR on language learning motivation.",
        keywords: [" How can you identify the research aims","How can you identify the research questions"]
      },
              {
        question: " What should you examine in the Methodology section to understand the data used?",
        answer: " • What kind of data is collected? (Quantitative, qualitative, mixed) • How is it collected? (Surveys, interviews, experiments, content analysis) •Who are the participants? (Students, teachers, etc.) • What tools or instruments were used? Link the data to the aim: Is the data type appropriate for answering the research questions?",
        keywords: ["What should you examine in the Methodology ", " section to understand the data used?"]
      },
              {
        question: "What should you look for in the Results section to analyze the findings effectively? ",
        answer: " • Are the results clearly presented in tables, graphs, or descriptive text? • Do the results directly respond to the research questions? • Are statistical tests or qualitative analyses used correctly? Try this: Match each result to one research aim.",
        keywords: [" What should you look for in the Results section", "to analyze the findings effectively? "]
      },
                    {
        question: "How do you evaluate the Discussion and Interpretation section of a research article? ",
        answer: " • Does the article explain how the findings connect to the research aims? • Are the findings compared with previous studies? • Does the author acknowledge limitations or suggest future research?",
        keywords: [" How do you evaluate the Discussion and Interpretation", "section of a research article?  "]
      },
                    {
        question: "What indicates a strong link between the research aim and the data? ",
        answer: "• Is there a clear logical connection from research aim → data → result → interpretation? • Does the data collected actually help answer the original questions?  Are there any gaps in logic or missing data? ",
        keywords: [" What indicates a strong link between the research", "aim and the data?"]
      },
                    {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
                    {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
                    {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
                    {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
                    {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
    ],
    voice: 'female'
  },

    /***********************************222222******************************************/
    prof2: {
    greeting:" Good afternoon. Today, I’ll explore how artificial intelligence is helping us forecast climate change more precisely. In India, for instance, AI models help predict monsoon arrival by analyzing 30 years of rainfall data. Let’s look at this graph , Let’s pause here. What’s the main idea so far? What details support it? Anyone want to guess the meaning of ‘predictive analytics’?",
    faqs: [
            {
        question: " I think it means using data to make predictions, right?",
        answer: " Exactly. Write it in your vocabulary column. Now, back to the lecture…",
        keywords: ["I think it means using data ", "to make predictions, right "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
      
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
      
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
    ],
    voice: 'male'
  },
  /*****************************************************************************/
      prof3: {
    greeting:" ",
    faqs: [
            {
        question: " ",
        answer: " ",
        keywords: [" ", " "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
    ],
    voice: 'male'
  },
  /**********************************3333333333333*******************************************/
      prof4: {
    greeting:"Welcome to today’s lab session. We will conduct a standard precipitation reaction between silver nitrate (AgNO₃) and sodium chloride (NaCl).",
    faqs: [
            {
        question: "What was the objective of the experiment? ",
        answer: "You’ll need the following materials: two test tubes, a pipette, a beaker, distilled water, silver nitrate solution, and sodium chloride solution. Step 1: Using the pipette, add 5 mL of silver nitrate to the first test tube. Step 2: In the second test tube, add 5 mL of sodium chloride. Step 3: Pour the sodium chloride solution into the test tube containing silver nitrate. Step 4: Observe the formation of a white precipitate, which is silver chloride (AgCl). The reaction occurring is: AgNO₃ (aq) + NaCl (aq) → AgCl (s) + NaNO₃ (aq) Silver chloride forms as a solid precipitate, while sodium nitrate remains dissolved in water. ",
        keywords: [" What was the objective of the experiment", " objective of the experiment "]
      },
            {
        question: " What Are the Goals of the Observation Activity?",
        answer: " The primary goals of the observation activity are to help students identify which section of a scientific report a piece of text belongs to, understand the purpose of each report section, and recognize key language that signals each part’s function. For example, phrases like “we measured” often indicate the Methods section. These skills support scientific literacy and help learners navigate lab reports with more confidence.",
        keywords: ["What Are the Goals of the Observation Activity? "," Observation Activity"]
      },
            {
        question: "What Happens in the VR Lab Activity and What Is the Experiment About? ",
        answer: "As part of Activity 4, students engage in a VR lab observation and note-taking task lasting approximately 30 minutes. The experiment involves using test tubes filled with enzyme solution, substrate solution, and pH buffers at three different levels (pH 3, 7, and 10). A stopwatch is used to time the reaction. Students follow a series of steps including adding the buffers, combining the enzyme and substrate, starting the timer, and observing the color changes to determine the reaction speed. ",
        keywords: ["What Happens in the VR ","Lab Activity and What Is the Experiment About? "]
      },
       {
        question: "What Variables and Observations Are Involved in the Experiment? ",
        answer: "In this experiment, the independent variable is the pH level, while the dependent variable is the reaction speed (indicated by the time taken for a visible color change). Controlled variables include enzyme and substrate quantities, temperature, and observation time. Observations revealed that pH 7 (neutral) produced the fastest and darkest color change in under one minute, pH 3 (acidic) had the slowest reaction with a faint color after five minutes, and pH 10 (basic) showed a moderate reaction time of around three minutes. ",
        keywords: [" What Variables and Observations Are Involved in the Experiment?"," Involved in the Experiment? "]
      },
            {
        question: "How Can the Data Be Summarized and Visualized? ",
        answer: "The data from the experiment can be summarized in a table showing pH levels alongside reaction speed and color intensity. A simple bar graph can visually represent reaction speeds, with bar height indicating speed—pH 7 would have the tallest bar due to its rapid reaction. This visual summary helps reinforce the understanding of the effect of pH on enzyme activity and the importance of graphical data in scientific communication. ",
        keywords: ["How Can the Data Be Summarized ","How Can the Data Be Summarized and Visualized "]
      },
       {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
    ],
    voice: 'male'
  },
  /**************************************5555555555555555555555555555555555555***************************************/
    prof6: {
    greeting: "Today, I’ll briefly introduce CRISPR gene editing and its potential in treating inherited diseases. The CRISPR-Cas9 system works like molecular scissors, allowing precise modification of DNA sequences. This has already been used in experimental trials targeting sickle-cell anemia and certain cancers…",
    faqs: [
      {
        question: "Sorry to interrupt—could you explain how CRISPR differs from older gene therapy techniques?",
        answer: " Great question, thank you. CRISPR is significantly more accurate and cost-effective compared to older viral vector-based methods. It allows scientists to target specific genes rather than rely on broader, riskier integrations.",
        keywords: ["Sorry to interrupt—could","could you explain how CRISPR differs","from older gene therapy techniques"]
      },
      {
        question: "That’s fascinating. However, aren't there ethical risks of misuse, especially with germline editing? ",
        answer: " That’s an important concern. While CRISPR offers huge potential, regulatory frameworks must be enforced to prevent unethical practices. It’s crucial to limit its use to therapeutic applications and ban enhancement or cosmetic uses.",
        keywords: ["That’s fascinating. However, ","aren't there ethical risks of misuse"]
      },
      
            {
        question: " What assumption is made about the relationship between antibiotics and microbiome reduction?",
        answer: " The findings suggest that antibiotics cause a significant reduction in microbiome diversity, which may lead to long-term health consequences, such as an increased risk of infections and a weakened immune response.",
        keywords: ["What assumption is made about the relationship "," between antibiotics and microbiome reduction? "]
      },
            {
        question: " What assumption is made about the recovery of the microbiome after antibiotic use?",
        answer: " The assumption here is that antibiotics always lead to this reduction, without considering other factors like diet, lifestyle, or genetic differences that may also contribute. The assumption is that the microbiome can naturally recover from antibiotic-induced damage, which may not be true for all individuals, particularly in cases of prolonged or heavy antibiotic use",
        keywords: [" What assumption is made about the recovery of the microbiome","after antibiotic use "]
      },
      
            {
        question: " Why is the evidence presented considered weak?",
        answer: "The evidence here is weak because the article doesn't specify the methodology in detail (e.g., how often the microbiota was sampled, how the data was analyzed, or what controls were used). Additionally, 150 participants might be a relatively small sample size for such a complex biological process, and the duration of two years might not be sufficient to capture long-term effects. ",
        keywords: [" Why is the evidence presented considered weak?"," "]
      },
            {
        question: "Does the claim hold up based on the evidence provided? ",
        answer: "The claim that antibiotics reduce microbiome diversity and cause long-term health consequences is plausible, but the evidence provided is insufficient to fully support it.  The study only mentions that microbiome recovery was observed, but there’s no clear evidence of how complete this recovery is or how it varies among participants. Additionally, more details are needed about the controls, participant demographics, and whether other factors were considered (such as age, pre-existing conditions, or lifestyle). ",
        keywords: ["Does the claim hold up based on the evidence provided? "," "]
      },
      
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" "," "]
      },
    ],
    voice: 'male'
  },
  /*****************************************************************************/
    prof7: {
    greeting: " ",
    faqs: [
      {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
    ],
    voice: 'male'
  },
  /***********************************4444444******************************************/
    prof8: {
    greeting: "Hello, nice to see you!",
    faqs: [
      {
        question: "Should Gene Editing Be Allowed in Humans? ",
        answer: "Good afternoon. We argue that gene editing in humans offers life-saving possibilities. With CRISPR technology, diseases like cystic fibrosis and sickle cell anemia can be eliminated before birth. Imagine a future free from genetic diseases. That’s what we advocate. ",
        keywords: ["Should Gene Editing ", "Be Allowed in Humans"]
      },
            {
        question: " 'designer babies,' leading to genetic discrimination ",
        answer: "That’s a valid concern, but with proper regulation, we can ensure access is fair. Additionally, gene editing isn't just about enhancements; it's about preventing suffering. We believe the benefits outweigh the risks ",
        keywords: ["designer babies ","leading to genetic discrimination"]
      },
            {
        question: "Can I ask Team Con—aren't there already strict bioethics boards? Wouldn't banning gene editing push it underground, where it's less regulated?  ",
        answer: " That’s a good question. We aren't suggesting a total ban but a pause until global guidelines are established. We need time to study long-term effects. ",
        keywords: [" Can I ask Team Con—aren't there already strict bioethics boards? ",]
      },
            {
        question: "Do you believe it's ethical to allow children to suffer from preventable diseases? ",
        answer: "In summary, gene editing is a tool to reduce human suffering. With proper checks, we can use it responsibly ",
        keywords: [" Do you believe it's ethical to allow children to suffer from preventable diseases?",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
    ],
    voice: 'male'
  },
  /*****************************************************************************/
    prof9: {
    greeting: "  ",
    faqs: [
      {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
                  {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },

            {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
    ],
    voice: 'male'
  },
  /*************************************44444****************************************/
  prof10: {
    greeting: "Hello, nice to see you!",
  faqs: [
    {
      question: "What’s your name and what’s your major?",
      answer: "I’m Omar, and I study Molecular Biology.",
      keywords: ["Molecular Biology"]
    },
    {
      question: "What motivated you to study Molecular Biology?",
      answer: "I’ve always been fascinated by DNA and how it controls life. I want to work on genetic therapies in the future.",
      keywords: ["DNA", "genetic therapies", "motivation"]
    },
    {
      question: "Do you have a current research project?",
      answer: "Yes, I’m studying CRISPR and its applications in treating genetic disorders.",
      keywords: ["CRISPR", "genetic disorders", "research project"]
    },
    {
      question: "Who inspires you in the scientific community?",
      answer: "Jennifer Doudna. Her work on CRISPR is revolutionary.",
      keywords: ["Jennifer Doudna", "CRISPR", "inspiration"]
    },
    {
      question: "Do you support AI involvement in your field?",
      answer: "Definitely. AI helps analyze genetic data faster, but ethical considerations are essential, especially for gene editing.",
      keywords: ["AI", "gene editing", "ethics"]
    },
    {
      question: "What do you hope to achieve with your research?",
      answer: "I hope to develop affordable gene therapy methods for underdeveloped countries.",
      keywords: ["gene therapy", "affordability", "underdeveloped countries"]
    },
          {
        question: "Should Gene Editing Be Allowed in Humans? ",
        answer: "While that sounds promising, we must consider the ethical risks. Who decides which genes are 'good' or 'bad'? Gene editing could create inequality, where only the wealthy can afford 'designer babies,' leading to genetic discrimination.",
        keywords: ["Should Gene Editing ", "Be Allowed in Humans"]
      },
                  {
        question: "We understand the desire to prevent suffering ",
        answer: "We understand the desire to prevent suffering, but... (hedging) history shows technology often outpaces regulation. If we rush into gene editing, we risk irreversible mistakes—such as unintended mutations or ecological imbalances. ",
        keywords: ["We understand the desire to prevent suffering ",]
      },
                  {
        question: "Is it ethical to experiment on unborn humans without knowing the consequences? ",
        answer: "In summary, gene editing is a tool to reduce human suffering. With proper checks, we can use it responsibly ",
        keywords: [" Is it ethical to experiment on unborn humans without knowing the consequences?",]
      },
                        {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
                        {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
                        {
        question: " ",
        answer: " ",
        keywords: [" ",]
      },
  ],
    voice: 'male'
  }
};
