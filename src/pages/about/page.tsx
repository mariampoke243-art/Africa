<main>

  {/* =========================================================
      1. ABOUT THE AFRICA ECONOMIC FORUM
  ========================================================= */}
  <section className="relative py-28 lg:py-36 bg-blue-900 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <h1 className="text-5xl lg:text-6xl font-bold mb-8">
        About the Africa Economic Forum
      </h1>

      <p className="text-xl lg:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
        A pan-African and global platform for strategic dialogue, sovereign
        cooperation, and long-term economic transformation. More than an
        event, the AEF is a permanent architecture for aligning leadership,
        capital, and policy to shape Africa&apos;s role in the world economy.
      </p>

    </div>
  </section>


  {/* =========================================================
      2. WHAT WE ARE
      Read More / Show Less applies ONLY to this section
  ========================================================= */}
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          What We Are
        </h2>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            showMoreWhatWeAre
              ? "max-h-[1000px]"
              : "max-h-[220px]"
          }`}
        >
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            The Africa Economic Forum (AEF) is a pan-African and global
            platform for strategic cooperation, sovereign development, and
            high-level economic alignment. It brings together African
            governments, global investors, institutions, and thought leaders
            to co-create new models of growth, partnership, and long-term
            value creation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowMoreWhatWeAre((prev) => !prev)}
          className="mt-8 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
        >
          {showMoreWhatWeAre ? "Show Less" : "Read More"}
        </button>

      </div>

    </div>
  </section>


  {/* =========================================================
      3. OUR HISTORY
  ========================================================= */}
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Our History
        </h2>

        <div className="space-y-10">

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              2022 - Origins
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              The Africa Economic Forum began in 2022 under the name ICN
              Global Summit and Award, created as a platform to celebrate
              inspiring leaders and foster dialogue on Africa&apos;s role in
              the world.
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              2022 — First Edition, Kinshasa
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              The inaugural edition in Kinshasa honored Dr. Denis Mukwege,
              Nobel Peace Prize laureate, and Mrs. Julienne Lusenge, Aurora
              Prize laureate and Time 100 honoree. The Summit convened
              senators, parliamentarians, business leaders, and international
              investors.
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              2023 — Second Edition, Kinshasa
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              The Forum returned to Kinshasa with broader recognition and
              global reach. Distinguished speakers included H.E. Rosalia
              Arteaga, former President of Ecuador, and H.E. Guy Loando,
              Minister of Territorial and Land Management of the DRC. The
              edition also celebrated the presence of Innoss&apos;B, renowned
              superstar and humanitarian, highlighting the Forum&apos;s
              commitment to cultural influence and social impact. Hundreds of
              government officials, entrepreneurs, and investors from across
              Africa and beyond participated.
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              2024 and Beyond — Evolution into AEF
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              Building on its early momentum, the initiative rebranded as the
              Africa Economic Forum (AEF), consolidating its identity as a
              premier global platform. Today, AEF convenes governments,
              investors, and thought leaders to drive investment, shape
              Africa&apos;s global agenda, and build equitable international
              partnerships.
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>


  {/* =========================================================
      4. OUR INSTITUTIONAL FRAMEWORK
  ========================================================= */}
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900">
          Our Institutional Framework
        </h2>
      </div>


      {/* A. ECONOMIC COOPERATION */}
      <div className="mb-20">

        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          A. Win-Win, Equitable and Ethical Economic Cooperation
        </h3>

        <h4 className="text-2xl font-semibold text-gray-800 mb-8">
          Rethinking and Reshaping Cooperation Models with Africa
        </h4>

        <div className="bg-gray-50 rounded-xl p-8 lg:p-10">

          <h5 className="text-xl font-bold text-gray-900 mb-4">
            A Strategic Imperative of the Africa Economic Forum
          </h5>

          <h6 className="text-lg font-bold text-gray-900 mb-4">
            Why This Rethink Matters
          </h6>

          <p className="text-gray-600 leading-relaxed mb-5">
            For decades, cooperation with Africa has often been defined by
            asymmetries — in power, in perception, and in value creation. The
            AEF calls for a decisive shift:
          </p>

          <ul className="space-y-3 mb-8 text-gray-600">
            <li>• From aid dependency to economic sovereignty</li>
            <li>• From foreign-led agendas to African-owned strategies</li>
            <li>
              • From short-term fixes to systems change and sustainable growth
            </li>
          </ul>

          <h6 className="text-lg font-bold text-gray-900 mb-5">
            The AEF&apos;s Contribution to a New Cooperation Paradigm:
          </h6>

          <div className="space-y-6">

            <p className="text-gray-600 leading-relaxed">
              <strong>1. Platform for Policy Dialogue:</strong> Bringing
              together heads of state, ministers, CEOs, investors, and thought
              leaders to co-design policies and frameworks that serve long-term
              African and global interests.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>2. Investment Matchmaking:</strong> Connecting African
              opportunities with global capital, with a focus on infrastructure,
              green energy, tech, health, agriculture, and the creative economy.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>3. Narrative Reset:</strong> Positioning Africa as a
              solution provider — not a problem to be solved. AEF elevates
              success stories, champions innovation, and celebrates Africa&apos;s
              global contributors.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>4. Geopolitical Rebalancing:</strong> In a shifting
              global order, the AEF asserts Africa&apos;s place at the table —
              not as a guest, but as a co-architect of the world&apos;s future.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>5. Inclusive Development Models:</strong> Promoting
              partnerships that empower youth, women, entrepreneurs, and local
              communities, ensuring that economic growth translates into shared
              prosperity.
            </p>

          </div>
        </div>
      </div>


      {/* B. LEADERSHIP AND GOVERNANCE */}
      <div className="mb-20">

        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          B. Quality Leadership and Governance in Africa
        </h3>

        <div className="space-y-10">

          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              1. Rethinking Leadership: From Power to Purpose
            </h4>

            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>Current Challenge:</strong> Leadership is too often
              centered on the accumulation of personal or clan-based power.
            </p>

            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>New Paradigm:</strong> A transformational leadership
              rooted in purpose, accountability, ethics, and long-term impact.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>Examples of models to follow:</strong> Servant
              leadership, Leadership inspired by African values such as Ubuntu
            </p>
          </div>


          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              2. Reshaping Governance: Institutions That Serve People
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Objective:</strong> Shift from extractive institutions
              to inclusive and accountable institutions.
            </p>

            <p className="font-semibold text-gray-900 mb-3">
              Key intervention areas:
            </p>

            <ul className="space-y-2 text-gray-600">
              <li>• Participatory constitutional reform</li>
              <li>• Digitalization of public administration</li>
              <li>
                • Strengthening mechanisms for transparency and citizen auditing
              </li>
              <li>• Real and effective decentralization</li>
            </ul>
          </div>


          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              3. New Patterns: Leadership Ecosystems & Collaborative Governance
            </h4>

            <ul className="space-y-3 text-gray-600">

              <li>
                • <strong>From verticality to horizontality:</strong> Promote
                the co-creation of public policies with citizens, the diaspora,
                youth, and local communities
              </li>

              <li>
                • <strong>Multi-stakeholder coalitions:</strong> Governments +
                businesses + civil society + traditional institutions
              </li>

              <li>
                • <strong>Distributed leadership:</strong> Create environments
                where every citizen becomes an agent of change
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              4. African Solutions to African Challenges
            </h4>

            <ul className="space-y-3 text-gray-600">

              <li>
                • <strong>Integrating African wisdom:</strong> Governance
                inspired by traditional systems (chiefdoms, councils of elders)
                adapted to contemporary challenges
              </li>

              <li>
                • <strong>Revaluing Africa&apos;s cultural and spiritual
                capital</strong> in governance models
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              5. Youth & Women as New Pillars of Governance
            </h4>

            <ul className="space-y-3 text-gray-600">

              <li>
                • <strong>Intergenerational leadership:</strong> Build bridges
                between generations
              </li>

              <li>
                • <strong>Access to power for women and youth:</strong> Smart
                quotas, campaign financing, and capacity building
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              6. Strategic Actions for Change
            </h4>

            <ul className="space-y-3 text-gray-600">
              <li>
                • Establish an African Center for Leadership and Innovative
                Governance
              </li>
              <li>
                • Launch inter-country dialogue forums on institutional reform
              </li>
              <li>
                • Setup public policy labs led by African youth and intellectuals
              </li>
              <li>
                • Train a new generation of leaders through pan-African
                governance schools
              </li>
            </ul>
          </div>

        </div>
      </div>


      {/* C. AFRICA'S ECONOMIC SOVEREIGNTY */}
      <div>

        <h3 className="text-3xl font-bold text-gray-900 mb-5">
          C. Africa&apos;s Economic Sovereignty
        </h3>

        <h4 className="text-2xl font-semibold text-gray-800 mb-8">
          Reclaiming and Reasserting African Sovereignty: Our Fight at the
          Africa Economic Forum
        </h4>

        <p className="text-gray-600 leading-relaxed mb-10">
          The Africa Economic Forum stands as a pivotal platform for advancing
          the continent&apos;s collective mission: the reappropriation and
          reconquest of African sovereignty in all its dimensions. This struggle
          is not merely ideological but a practical necessity for Africa&apos;s
          true emancipation and prosperity. Below are the key pillars of this
          sovereign revolution:
        </p>


        <div className="space-y-10">

          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              1. Economic Sovereignty: An African Market Dominated by African
              Products
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              Africa remains overly dependent on imports, with intra-African
              trade accounting for only 15-18% of total trade, compared to 60%
              in Europe and 40% in Asia (AfDB, 2022). To reverse this, we must:
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>
                • Strengthen local production and value-added industries to
                reduce reliance on foreign goods
              </li>

              <li>
                • Accelerate the African Continental Free Trade Area (AfCFTA),
                which could boost intra-African trade by 52% by 2035 (World Bank)
              </li>

              <li>
                • Implement protectionist policies strategically to nurture
                homegrown industries while fostering fair and equitable global
                trade partnerships
              </li>
            </ul>
          </div>


          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              2. Win-Win South-South and Global Cooperation Based on Equality
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              Africa must redefine its global engagements, moving away from
              asymmetric partnerships that perpetuate dependency. Instead, we
              advocate for:
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Strengthened South-South alliances (e.g., BRICS+, ASEAN-Africa
                collaborations) to enhance bargaining power
              </li>

              <li>
                • Technology and knowledge transfer agreements that prioritize
                Africa&apos;s long-term development
              </li>

              <li>
                • Debt justice and fair financing, as African nations spend more
                on debt servicing (up to 25% of revenues in some cases) than on
                healthcare or education (UNECA)
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              3. Media Sovereignty: Controlling Our Narrative
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              Over 75% of Africa&apos;s media content is sourced from Western
              outlets (Reuters Institute), distorting perceptions and stifling
              African perspectives. We must:
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Invest in Pan-African media networks (e.g., Africa News Agency,
                Afrocentric digital platforms)
              </li>

              <li>
                • Regulate foreign media monopolies to ensure balanced
                representation
              </li>

              <li>
                • Promote journalistic training and investigative reporting
                rooted in African realities
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              4. Cultural Sovereignty: Reclaiming Our Heritage
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              From repatriating stolen artifacts (only 10% of Africa&apos;s
              cultural heritage remains on the continent) to resisting cultural
              imperialism, we must:
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Revitalize indigenous languages (over 1,000 African languages
                are endangered — UNESCO)
              </li>

              <li>
                • Support Afrocentric education and creative industries
                (Nollywood, Afrobeats, and African literature as global soft
                power tools)
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              5. Scientific Sovereignty: Innovation on Our Terms
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              Africa contributes less than 1% of global research output (World
              Bank), yet holds untapped potential. Solutions include:
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Increasing R&amp;D investment (currently below 0.5% of GDP in
                most African nations, vs. 2.5%+ in developed countries)
              </li>

              <li>
                • Establishing African-led research hubs in AI, renewable
                energy, and medicine
              </li>

              <li>
                • Ending brain drain by creating competitive opportunities for
                African scientists and innovators
              </li>

            </ul>
          </div>


          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              6. Philosophical Sovereignty: Decolonizing African Thought
            </h4>

            <p className="text-gray-600 leading-relaxed mb-4">
              The dominance of Western epistemological frameworks continues to
              shape African policies and mindsets. We must:
            </p>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Promote endogenous knowledge systems (Ubuntu, Negritude,
                African feminist thought)
              </li>

              <li>
                • Decolonize education curricula to reflect Africa&apos;s
                historical and philosophical contributions
              </li>

              <li>
                • Foster critical thinking that aligns with Africa&apos;s
                socio-economic realities
              </li>

            </ul>
          </div>

        </div>
      </div>

    </div>
  </section>


  {/* =========================================================
      5. OUR VISION
  ========================================================= */}
  <section className="py-28 bg-blue-900 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <h2 className="text-4xl lg:text-5xl font-bold mb-10">
        Our Vision
      </h2>

      <p className="text-2xl lg:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
        To position Africa as a sovereign economic power, a center of
        innovation, and a global co-leader — shaping the future through
        strategic alliances, dignified cooperation, and purpose-driven
        leadership.
      </p>

    </div>
  </section>


  {/* =========================================================
      6. THE CONCEPT
  ========================================================= */}
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-5xl mx-auto mb-16">

        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          The Concept: The Perpetual Forum &amp; The African Table
        </h2>

        <p className="text-xl text-gray-600">
          A new approach to economic diplomacy: continuous, strategic, and
          sovereign.
        </p>

      </div>

      <div className="max-w-5xl mx-auto">

        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
          The Africa Economic Forum is not a gathering. It is an architecture.
          It operates as a <strong>perpetual, year-round platform</strong>
          designed to align African sovereign priorities with global capital
          flows, institutional frameworks, and execution capacity. This model
          redefines how Africa positions itself in the global economy — not as
          a destination for donor conferences, but as{' '}
          <strong>
            the convening authority setting the terms of engagement.
          </strong>
        </p>

        <p className="text-xl text-gray-800 font-medium mb-10">
          Three interconnected pillars define the AEF Model:
        </p>


        {/* PILLAR 1 */}
        <div className="bg-blue-50 rounded-xl border-b-4 border-blue-800 p-8 lg:p-12 mb-10">

          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-calendar-line text-2xl text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            1. The Perpetual Forum
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Unlike episodic summits, the AEF runs a continuous cycle of
            sector-specific forums, ensuring strategic continuity and
            measurable outcomes.
          </p>

          <div className="space-y-5 text-gray-700">

            <p>
              <strong>Year-Round Engagement:</strong> Sustained dialogue
              between African governments, global investors, and institutions.
            </p>

            <p>
              <strong>Sector-Driven Precision:</strong> From critical minerals
              to infrastructure, each forum zeroes in on concrete deal
              structures and investment vehicles.
            </p>

            <p>
              <strong>Africa Sets the Clock:</strong> The Forum adapts to
              African policy cycles, resource extraction timelines, and
              political priorities—not external agendas.
            </p>

          </div>
        </div>


        {/* PILLAR 2 */}
        <div className="bg-teal-50 rounded-xl border-b-4 border-teal-800 p-8 lg:p-12 mb-10">

          <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-group-line text-2xl text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            2. The African Table
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Sovereignty begins with control of the agenda. The African Table
            means Africa invites, Africa convenes, and Africa defines the terms
            of cooperation.
          </p>

          <div className="space-y-5 text-gray-700">

            <p>
              <strong>Agenda Sovereignty:</strong> Topics reflect African
              priorities, not external frameworks or geopolitical impositions.
            </p>

            <p>
              <strong>Strategic Matchmaking:</strong> Investors are curated
              based on alignment with long-term African development, not
              short-term extraction.
            </p>

            <p>
              <strong>Deal-Oriented Diplomacy:</strong> Every panel, every
              roundtable, every closed-door session is structured to move from
              dialogue to signed commitments.
            </p>

          </div>
        </div>


        {/* PILLAR 3 */}
        <div className="bg-purple-50 rounded-xl border-b-4 border-purple-800 p-8 lg:p-12">

          <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-government-line text-2xl text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            3. Host Country Partnership
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Each sector forum is hosted by an African nation that has committed
            to leading the agenda in that domain, ensuring the highest level of
            government engagement and deal-making potential.
          </p>

          <div className="space-y-5 text-gray-700">

            <p>
              <strong>National Champions:</strong> The forum host demonstrates
              sovereign ownership of the sector&apos;s strategic vision.
            </p>

            <p>
              <strong>Infrastructure for Execution:</strong> Forums integrate
              national project pipelines, regulatory frameworks, and investment
              climate reforms.
            </p>

            <p>
              <strong>Permanent Regional Hub:</strong> Host nations become nodes
              of expertise and investment, sustaining sectoral networks beyond
              the event.
            </p>

          </div>
        </div>

      </div>
    </div>
  </section>


  {/* =========================================================
      7. WHY THIS MATTERS
  ========================================================= */}
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto bg-white border-l-4 border-blue-900 rounded-xl shadow-sm p-8 lg:p-12">

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Why This Matters
        </h2>

        <div className="space-y-8 text-lg text-gray-600 leading-relaxed">

          <p>
            For decades, Africa has been the subject of conferences designed
            elsewhere. The AEF reverses this dynamic. It positions Africa as a{' '}
            <strong>global convening power</strong>, not a beneficiary of
            external goodwill. It is where African heads of state, finance
            ministers, and sovereign wealth funds align their strategies with
            the world&apos;s leading investors, development institutions, and
            industrial actors.
          </p>

          <p className="font-semibold text-gray-800">
            The Perpetual Forum ensures continuity. The African Table ensures
            sovereignty. The Host Country Partnership ensures execution.
          </p>

          <p>
            This is how Africa designs its future, sector by sector, deal by
            deal.
          </p>

        </div>
      </div>

    </div>
  </section>


  {/* =========================================================
      8. CHAIRMAN MESSAGE
  ========================================================= */}
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-14">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          A Message from the Chairman
        </h2>
      </div>

      <div className="space-y-8 text-lg text-gray-600 leading-relaxed">

        <p>
          The world is recalibrating. The old paradigms are shifting, and in
          this new geopolitical and economic landscape, Africa emerges not as a
          spectator but as a definitive arena of opportunity. The Africa
          Economic Forum is the platform where this new reality is forged.
        </p>

        <p>
          We are The African Table. It is Africa that extends the invitation,
          sets the agenda, and defines the terms of a truly strategic, win-win
          cooperation. Our model is deliberate: a perpetual, year-long journey
          across the continent, diving deep into each critical sector.
        </p>

        <p>
          In this new era of global realignments, our mission is clear: to
          connect global capital with Africa&apos;s immense opportunities, to
          build alliances that matter, and to unlock strategic value through
          structured cooperation.
        </p>

        <p>
          This is not just another forum. This is where the future of Africa is
          designed — deal by deal. I invite you to join us at The African Table.
        </p>

        <div className="border-t border-gray-200 pt-8">

          <p className="font-bold text-gray-900 text-xl">
            — Dr. Billy Issa
          </p>

          <p className="text-gray-500 italic">
            Visionary Founder &amp; Host
          </p>

        </div>

      </div>

    </div>
  </section>


  {/* =========================================================
      9. FOUNDER
  ========================================================= */}
  <section className="py-20 bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Dr. Billy Issa
        </h2>

        <p className="text-xl text-gray-600 italic">
          Visionary Founder &amp; Host
        </p>

      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src="/images/billy-issa.jpg"
          alt="Dr. Billy Issa"
          className="w-full max-h-[650px] object-cover object-top"
        />

        <div className="p-8">

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Dr. Billy Issa
          </h3>

          <p className="text-blue-600 font-medium">
            Visionary Founder &amp; Host
          </p>

        </div>

      </div>

    </div>
  </section>


  {/* =========================================================
      10. ORGANIZING COMMITTEE
      Existing data preserved
  ========================================================= */}
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-16">

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('about.organizingCommitteeTitle')}
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('about.organizingCommitteeSubtitle')}
        </p>

      </div>


      {/* Strategic Advisory Board */}
      <div className="mb-20">

        <div className="text-center mb-12">

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            AEF Strategic Advisory Board
          </h3>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.advisoryBoardSubtitle')}
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {advisoryBoard.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              t={t}
            />
          ))}

        </div>

      </div>


      {/* Executive Board */}
      <div className="mb-20">

        <div className="text-center mb-12">

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            AEF Executive Board
          </h3>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.executiveBoardSubtitle')}
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {executiveBoard.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              t={t}
            />
          ))}

        </div>

      </div>


      {/* Scientific Committee */}
      <div>

        <div className="text-center mb-12">

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Scientific Committee
          </h3>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.scientificCommitteeSubtitle')}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {scientificCommittee.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              t={t}
            />
          ))}

        </div>

      </div>

    </div>
  </section>


  {/* =========================================================
      11. OUR STRATEGIC ROLE
  ========================================================= */}
  <section className="py-20 bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        Our Strategic Role
      </h2>

      <div className="space-y-6 text-lg text-gray-600 leading-relaxed">

        <p>
          The Africa Economic Forum is designed as a permanent strategic
          platform — not a one-off event. Its role is to align African
          sovereign priorities with global capital, policy frameworks, and
          execution capacity in a structured and continuous manner.
        </p>

        <p>
          Through sector-specific forums, high-level deal rooms, and year-round
          engagement, the AEF enables governments, investors, and institutions
          to move beyond dialogue into concrete partnerships, co-investment
          structures, and policy alignment.
        </p>

        <p>
          The AEF operates as a bridge between strategy and execution —
          ensuring that political vision, private capital, and institutional
          capacity are brought into the same architecture, with Africa setting
          the agenda and defining the terms of cooperation.
        </p>

      </div>

    </div>
  </section>


  {/* =========================================================
      12. CTA
  ========================================================= */}
  <section className="py-20 bg-blue-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <h2 className="text-4xl font-bold mb-6">
        {t('about.joinMovementTitle')}
      </h2>

      <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
        {t('about.joinMovementText')}
      </p>

      <Link
        to="/join"
        className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        {t('about.becomeMember')}
      </Link>

    </div>
  </section>

</main>
