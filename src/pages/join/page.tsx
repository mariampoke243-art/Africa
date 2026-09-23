import React, { useState } from 'react';
import { supabase } from '../../supabase/client';

export default function Join() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicationReference, setApplicationReference] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleSignInSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '');

      if (!email || !password) {
        alert('Please fill in all required fields.');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert('Login successful! Welcome back.');
      setShowSignInModal(false);
    } catch (error) {
      console.error('Login error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const generateApplicationReference = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';

    for (let i = 0; i < 6; i++) {
      code += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return `AEF-${code}`;
  };

  const handleMembershipSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (submitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);

    try {
      const applicationReference =
        generateApplicationReference();

      // Application date stored as YYYY-MM-DD
      const applicationDate = new Date()
        .toISOString()
        .split('T')[0];

      // Annual contribution
      const contributionText = String(
        formData.get('annual_membership_contribution') || ''
      ).trim();

      const annualMembershipContribution =
        contributionText === ''
          ? null
          : Number(contributionText);

      if (
        annualMembershipContribution !== null &&
        !Number.isFinite(annualMembershipContribution)
      ) {
        alert(
          'Please enter a valid annual membership contribution.'
        );
        return;
      }

      const { error } = await supabase
        .from('membership_applications')
        .insert([
          {
            // --------------------------------
            // 1. APPLICANT INFORMATION
            // --------------------------------
            first_name: String(
              formData.get('first_name') || ''
            ).trim(),

            last_name: String(
              formData.get('last_name') || ''
            ).trim(),

            position_title: String(
              formData.get('position_title') || ''
            ).trim(),

            professional_email: String(
              formData.get('professional_email') || ''
            ).trim(),

            telephone_whatsapp:
              String(
                formData.get('telephone_whatsapp') || ''
              ).trim() || null,

            country: String(
              formData.get('country') || ''
            ).trim(),

            // --------------------------------
            // 2. ORGANIZATION INFORMATION
            // --------------------------------
            organization_name: String(
              formData.get('organization_name') || ''
            ).trim(),

            organization_type: String(
              formData.get('organization_type') || ''
            ).trim(),

            organization_type_other:
              String(
                formData.get('organization_type_other') || ''
              ).trim() || null,

            country_of_registration: String(
              formData.get('country_of_registration') || ''
            ).trim(),

            city_headquarters:
              String(
                formData.get('city_headquarters') || ''
              ).trim() || null,

            website:
              String(
                formData.get('website') || ''
              ).trim() || null,

            organization_email: String(
              formData.get('organization_email') || ''
            ).trim(),

            organization_description: String(
              formData.get('organization_description') || ''
            ).trim(),

            // --------------------------------
            // 3. SECTOR
            // --------------------------------
            primary_sector: String(
              formData.get('primary_sector') || ''
            ).trim(),

            primary_sector_other:
              String(
                formData.get('primary_sector_other') || ''
              ).trim() || null,

            // --------------------------------
            // 4. AGCP - 10 PRINCIPLES
            // --------------------------------
            principle_1_sovereignty:
              formData.get(
                'principle_1_sovereignty'
              ) !== null,

            principle_2_long_term_investment:
              formData.get(
                'principle_2_long_term_investment'
              ) !== null,

            principle_3_transparency_ethics:
              formData.get(
                'principle_3_transparency_ethics'
              ) !== null,

            principle_4_skills_technology_transfer:
              formData.get(
                'principle_4_skills_technology_transfer'
              ) !== null,

            principle_5_sme_value_chains:
              formData.get(
                'principle_5_sme_value_chains'
              ) !== null,

            principle_6_environmental_responsibility:
              formData.get(
                'principle_6_environmental_responsibility'
              ) !== null,

            principle_7_women_youth:
              formData.get(
                'principle_7_women_youth'
              ) !== null,

            principle_8_fair_taxation:
              formData.get(
                'principle_8_fair_taxation'
              ) !== null,

            principle_9_stakeholder_dialogue:
              formData.get(
                'principle_9_stakeholder_dialogue'
              ) !== null,

            principle_10_impact_accountability:
              formData.get(
                'principle_10_impact_accountability'
              ) !== null,

            // --------------------------------
            // 5. COMMITMENT
            // --------------------------------
            commitment_read_understood:
              formData.get(
                'commitment_read_understood'
              ) !== null,

            commitment_support_principles:
              formData.get(
                'commitment_support_principles'
              ) !== null,

            commitment_uphold_principles:
              formData.get(
                'commitment_uphold_principles'
              ) !== null,

            commitment_responsible_cooperation:
              formData.get(
                'commitment_responsible_cooperation'
              ) !== null,

            commitment_promote_principles:
              formData.get(
                'commitment_promote_principles'
              ) !== null,

            commitment_participate_dialogue:
              formData.get(
                'commitment_participate_dialogue'
              ) !== null,

            // --------------------------------
            // 6. AUTHORIZED REPRESENTATIVE
            // --------------------------------
            representative_full_name:
              String(
                formData.get(
                  'representative_full_name'
                ) || ''
              ).trim(),

            representative_position_title:
              String(
                formData.get(
                  'representative_position_title'
                ) || ''
              ).trim(),

            representative_organization:
              String(
                formData.get(
                  'representative_organization'
                ) || ''
              ).trim(),

            application_date:
              applicationDate,

            electronic_signature:
              String(
                formData.get(
                  'electronic_signature'
                ) || ''
              ).trim(),

            authorized_to_sign:
              formData.get(
                'authorized_to_sign'
              ) !== null,

            agrees_to_pact:
              formData.get(
                'agrees_to_pact'
              ) !== null,

            agrees_to_signatory_register:
              formData.get(
                'agrees_to_signatory_register'
              ) !== null,

            // --------------------------------
            // 7. MEMBERSHIP CATEGORY
            // --------------------------------
            membership_category:
              String(
                formData.get(
                  'membership_category'
                ) || ''
              ).trim(),

            membership_category_other:
              String(
                formData.get(
                  'membership_category_other'
                ) || ''
              ).trim() || null,

            annual_membership_contribution:
              annualMembershipContribution,

            // --------------------------------
            // 8. FINAL CONFIRMATIONS
            // --------------------------------
            application_and_pact_confirmation:
              formData.get(
                'application_and_pact_confirmation'
              ) !== null,

            information_accuracy_confirmation:
              formData.get(
                'information_accuracy_confirmation'
              ) !== null,

            // --------------------------------
            // SYSTEM FIELDS
            // --------------------------------
            application_reference:
              applicationReference,

            status: 'pending',
          },
        ]);

      if (error) {
        console.error(
          'Membership application error:',
          error
        );

        alert(
          `Unable to submit your application: ${error.message}`
        );

        return;
      }

      // Success
      setApplicationReference(applicationReference);
      setFormSubmitted(true);

      form.reset();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(
        'Unexpected membership application error:',
        error
      );

      alert(
        'An unexpected error occurred. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const memberBenefits = [
    {
      title: 'Global Network of Leaders',
      description:
        'Connect with African and international leaders on our exclusive platform.',
      icon: 'ri-global-line',
    },
    {
      title: 'Privileged Access to Events',
      description:
        'Participate in summits, conferences and exclusive meetings.',
      icon: 'ri-calendar-event-line',
    },
    {
      title: 'Economic Intelligence',
      description:
        'Receive reports, market analyses and insights on African opportunities.',
      icon: 'ri-line-chart-line',
    },
    {
      title: 'Business Opportunities',
      description:
        'Access investment opportunities, partnerships and development projects.',
      icon: 'ri-handshake-line',
    },
    {
      title: 'Professional Development',
      description:
        'Access training programs, workshops and professional development opportunities.',
      icon: 'ri-graduation-cap-line',
    },
    {
      title: 'Policy Dialogue',
      description:
        'Participate in dialogue around Africa’s economic future.',
      icon: 'ri-government-line',
    },
  ];

  const foundingPrinciples = [
    {
      number: 1,
      title: 'Sovereignty of African Economic Choices',
      name: 'principle_1_sovereignty',
      text:
        'I / We support the sovereign right of African states to define their economic priorities and development strategies.',
    },
    {
      number: 2,
      title: 'Long-Term Structuring Investment',
      name: 'principle_2_long_term_investment',
      text:
        'I / We support investment that contributes to long-term productive capacity, infrastructure, employment and economic transformation.',
    },
    {
      number: 3,
      title: 'Transparency, Business Ethics and Anti-Corruption',
      name: 'principle_3_transparency_ethics',
      text:
        'I / We support transparent, ethical and accountable business practices and reject corruption and illicit practices.',
    },
    {
      number: 4,
      title: 'Skills Development and Technology Transfer',
      name: 'principle_4_skills_technology_transfer',
      text:
        'I / We support the development of local capabilities, skills, knowledge and appropriate technology transfer.',
    },
    {
      number: 5,
      title: 'Inclusion of African SMEs in Global Value Chains',
      name: 'principle_5_sme_value_chains',
      text:
        'I / We support the participation of African enterprises and SMEs in regional and global value chains.',
    },
    {
      number: 6,
      title: 'Environmental Responsibility and Green Transition',
      name: 'principle_6_environmental_responsibility',
      text:
        'I / We support responsible environmental practices and sustainable and resilient economic development.',
    },
    {
      number: 7,
      title: 'Participation of Women and Youth',
      name: 'principle_7_women_youth',
      text:
        'I / We support meaningful participation and economic opportunities for women and young people.',
    },
    {
      number: 8,
      title: 'Fair Taxation and Responsible Fiscal Practices',
      name: 'principle_8_fair_taxation',
      text:
        'I / We support responsible tax practices and efforts to combat illicit financial flows and tax evasion.',
    },
    {
      number: 9,
      title: 'Continuous Stakeholder Dialogue',
      name: 'principle_9_stakeholder_dialogue',
      text:
        'I / We support meaningful dialogue with local communities and relevant stakeholders affected by economic activities and partnerships.',
    },
    {
      number: 10,
      title: 'Impact Measurement and Accountability',
      name: 'principle_10_impact_accountability',
      text:
        'I / We support the measurement of economic, social and environmental impact and responsible reporting on progress.',
    },
  ];

  const commitmentItems = [
    {
      name: 'commitment_read_understood',
      text: 'We have read and understood the Africa Global Cooperation Pact.',
    },
    {
      name: 'commitment_support_principles',
      text: 'We support the ten founding principles of the Pact.',
    },
    {
      name: 'commitment_uphold_principles',
      text:
        'We intend to uphold these principles, where applicable, in our activities, strategies, projects and partnerships involving Africa.',
    },
    {
      name: 'commitment_responsible_cooperation',
      text:
        'We support responsible, transparent, sustainable and mutually beneficial economic cooperation with Africa.',
    },
    {
      name: 'commitment_promote_principles',
      text:
        'We agree to promote the principles of the Pact among our relevant partners and stakeholders.',
    },
    {
      name: 'commitment_participate_dialogue',
      text:
        'We agree to participate, where appropriate, in dialogue and activities organized by the Africa Economic Forum in connection with the Pact.',
    },
  ];

  const organizationTypes = [
    'Government / Public Institution',
    'International Organization',
    'Investor / Investment Fund',
    'Bank / Financial Institution',
    'Family Office',
    'Business / Corporation',
    'SME',
    'NGO / Foundation',
    'University / Academic Institution',
    'Think Tank',
    'Media',
    'African Diaspora / Business Network',
    'Professional Association',
    'Other',
  ];

  const sectors = [
    'Energy',
    'Mining & Critical Minerals',
    'Agriculture & Food',
    'Infrastructure',
    'Trade & Investment',
    'Technology & Digital',
    'Healthcare & Pharmaceuticals',
    'Manufacturing',
    'Finance',
    'Logistics & Transport',
    'Tourism',
    'Education',
    'Other',
  ];

  const membershipCategories = [
    'Government / Public Institution',
    'International Organization',
    'Investor / Investment Fund',
    'Bank / Financial Institution',
    'Business / Corporation',
    'SME',
    'NGO / Foundation',
    'University / Think Tank',
    'Media',
    'African Diaspora / Business Network',
    'Professional Association',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png"
                  alt="Africa Economic Forum"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Initiatives
              </a>
              <a
                href="/stakeholders"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Stakeholders
              </a>
              <a
                href="/agenda"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Agenda
              </a>
              <a
                href="/publications"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Publications
              </a>
              <a
                href="/meetings"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Meetings
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleSignIn}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <button className="md:hidden p-2 cursor-pointer">
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative py-28 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,58,138,0.82), rgba(30,58,138,0.82)), url('https://readdy.ai/api/search-image?query=Diverse%20group%20of%20African%20professionals%20and%20leaders%20joining%20hands%20in%20unity%2C%20membership%20and%20community%20building%2C%20professional%20networking%20and%20collaboration&width=1920&height=800&seq=membership-hero&orientation=landscape')",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Membership Application
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto">
              Join the Africa Economic Forum and become a Signatory of the Africa Global Cooperation Pact.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                JOIN THE AFRICA ECONOMIC FORUM
              </h2>

              <p className="text-gray-600 max-w-3xl mx-auto">
                Thank you for your interest in joining the Africa Economic Forum (AEF).
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-gray-50 rounded-lg p-6 text-center"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i
                      className={`${benefit.icon} text-2xl text-blue-700`}
                    ></i>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            {formSubmitted ? (
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line text-4xl text-green-600"></i>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  THANK YOU FOR JOINING THE AFRICA ECONOMIC FORUM
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Your membership application and your organization's signature of the Africa Global Cooperation Pact have been successfully received.
                </p>

                <p className="text-gray-600 mb-2">
                  Your application will be reviewed by the Africa Economic Forum.
                </p>

                <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-8 py-5 my-6">
                  <p className="text-sm text-gray-500 mb-1">
                    Application Reference
                  </p>

                  <p className="text-2xl font-bold text-blue-900 tracking-wider">
                    {applicationReference}
                  </p>
                </div>

                <p className="text-gray-600 mb-8">
                  You will receive a confirmation by email.
                </p>

                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setApplicationReference('');
                  }}
                  className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    MEMBERSHIP APPLICATION FORM
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-3">
                    By completing this membership application, your organization also formally endorses and signs the Africa Global Cooperation Pact (AGCP), an initiative of the Africa Economic Forum.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    Joining the Africa Economic Forum means becoming a Signatory of the Africa Global Cooperation Pact. There is one application, one membership process and one institutional commitment.
                  </p>
                </div>

                <form
                  onSubmit={handleMembershipSubmit}
                  className="space-y-12"
                >
                  {/* 1 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      1. APPLICANT INFORMATION
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        name="first_name"
                        required
                      />

                      <Input
                        label="Last Name"
                        name="last_name"
                        required
                      />

                      <Input
                        label="Position / Title"
                        name="position_title"
                        required
                      />

                      <Input
                        label="Professional Email"
                        name="professional_email"
                        type="email"
                        required
                      />

                      <Input
                        label="Telephone / WhatsApp"
                        name="telephone_whatsapp"
                        type="tel"
                      />

                      <Input
                        label="Country"
                        name="country"
                        required
                      />
                    </div>
                  </section>

                  {/* 2 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      2. ORGANIZATION INFORMATION
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Organization Name"
                        name="organization_name"
                        required
                      />

                      <Select
                        label="Organization Type"
                        name="organization_type"
                        options={organizationTypes}
                        required
                      />

                      <Input
                        label="If Other, please specify"
                        name="organization_type_other"
                      />

                      <Input
                        label="Country of Registration"
                        name="country_of_registration"
                        required
                      />

                      <Input
                        label="City / Headquarters"
                        name="city_headquarters"
                      />

                      <Input
                        label="Website"
                        name="website"
                        type="url"
                        placeholder="https://"
                      />

                      <Input
                        label="Organization Email"
                        name="organization_email"
                        type="email"
                        required
                      />
                    </div>

                    <div className="mt-6">
                      <TextArea
                        label="Brief Description of the Organization"
                        name="organization_description"
                        required
                        rows={5}
                      />
                    </div>
                  </section>

                  {/* 3 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      3. SECTOR / AREA OF ACTIVITY
                    </h3>

                    <Select
                      label="Primary Sector"
                      name="primary_sector"
                      options={sectors}
                      required
                    />

                    <div className="mt-6">
                      <Input
                        label="If Other, please specify"
                        name="primary_sector_other"
                      />
                    </div>
                  </section>

                  {/* 4 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-4">
                      4. AFRICA GLOBAL COOPERATION PACT
                    </h3>

                    <p className="text-lg font-semibold text-gray-900 mb-4">
                      A Framework for Equitable, Responsible and Strategic Economic Cooperation with Africa
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-4">
                      By joining the Africa Economic Forum, the organization confirms its support for the Africa Global Cooperation Pact (AGCP).
                    </p>

                    <div className="bg-gray-50 border rounded-lg p-6 mb-8">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Preamble
                      </h4>

                      <p className="text-gray-600 leading-relaxed">
                        Recognizing the unique challenges and opportunities presented by the African continent;
                        <br /><br />
                        Convinced that Africa is an essential actor in shaping a new global economic order;
                        <br /><br />
                        Committed to promoting cooperation based on equity, transparency, sustainability and respect for sovereignty;
                        <br /><br />
                        We, the Signatories of the Africa Global Cooperation Pact, affirm our commitment to building responsible, strategic and mutually beneficial partnerships for a shared future.
                      </p>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-5">
                      THE 10 FOUNDING PRINCIPLES
                    </h4>

                    <div className="space-y-5">
                      {foundingPrinciples.map((principle) => (
                        <div
                          key={principle.number}
                          className="border rounded-lg p-5 hover:bg-gray-50"
                        >
                          <strong className="block text-gray-900 mb-2">
                            {principle.number}. {principle.title}
                          </strong>

                          <span className="text-gray-600 text-sm leading-relaxed">
                            {principle.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 5 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      5. DECLARATION OF COMMITMENT
                    </h3>

                    <p className="text-gray-600 mb-6">
                      By submitting this application, I confirm that I am authorized to represent the organization identified above.
                    </p>

                    <div className="space-y-4">
                      {commitmentItems.map((item) => (
                        <label
                          key={item.name}
                          className="flex items-start gap-4 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name={item.name}
                            required
                            className="mt-1 w-5 h-5 cursor-pointer"
                          />

                          <span className="text-gray-700 leading-relaxed">
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* 6 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      6. AUTHORIZED REPRESENTATIVE
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="representative_full_name"
                        required
                      />

                      <Input
                        label="Position / Title"
                        name="representative_position_title"
                        required
                      />

                      <Input
                        label="Organization"
                        name="representative_organization"
                        required
                      />

                      <Input
                        label="Date"
                        name="application_date"
                        type="text"
                        value={new Date().toLocaleDateString()}
                        readOnly
                      />
                    </div>

                    <div className="mt-6">
                      <Input
                        label="Electronic Signature — Type your full name"
                        name="electronic_signature"
                        required
                      />
                    </div>

                    <div className="mt-6 space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="authorized_to_sign"
                          required
                          className="mt-1 w-5 h-5"
                        />

                        <span className="text-gray-700">
                          I confirm that I am authorized to sign the Africa Global Cooperation Pact on behalf of the organization identified in this application.
                        </span>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agrees_to_pact"
                          required
                          className="mt-1 w-5 h-5"
                        />

                        <span className="text-gray-700">
                          I have read, understood and agree to the principles and commitments of the Africa Global Cooperation Pact.
                        </span>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agrees_to_signatory_register"
                          required
                          className="mt-1 w-5 h-5"
                        />

                        <span className="text-gray-700">
                          I agree to the publication of my organization's name, country and Signatory status in the AGCP Global Signatory Register.
                        </span>
                      </label>
                    </div>
                  </section>

                  {/* 7 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      7. AEF MEMBERSHIP CATEGORY
                    </h3>

                    <p className="text-gray-600 mb-6">
                      Please select the category corresponding to your organization:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {membershipCategories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="membership_category"
                            value={category}
                            required
                            className="w-5 h-5"
                          />

                          <span className="text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Input
                        label="If Other, please specify"
                        name="membership_category_other"
                      />
                    </div>

                    <div className="mt-6">
                      <Input
                        label="Annual Membership Contribution (USD)"
                        name="annual_membership_contribution"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Determined by the Africa Economic Forum"
                      />
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      Membership contribution levels are determined by the Africa Economic Forum.
                    </p>
                  </section>

                  {/* 8 */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 border-b pb-3 mb-6">
                      8. FINAL SUBMISSION
                    </h3>

                    <div className="space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="application_and_pact_confirmation"
                          required
                          className="mt-1 w-5 h-5"
                        />

                        <span className="text-gray-700 leading-relaxed">
                          I understand that this application constitutes both my application for AEF Membership and my organization's formal signature of the Africa Global Cooperation Pact.
                        </span>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="information_accuracy_confirmation"
                          required
                          className="mt-1 w-5 h-5"
                        />

                        <span className="text-gray-700 leading-relaxed">
                          I confirm that the information provided is accurate and complete.
                        </span>
                      </label>
                    </div>
                  </section>

                  {/* Submit */}
                  <div className="border-t pt-8">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-900 text-white px-8 py-4 rounded-md hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-lg"
                    >
                      {submitting
                        ? 'SUBMITTING APPLICATION...'
                        : 'SUBMIT MEMBERSHIP APPLICATION & SIGN THE PACT'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Sign In
                </h3>

                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form
                onSubmit={handleSignInSubmit}
                className="space-y-4"
              >
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-6">
                About us
              </h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    Our mission
                  </a>
                </li>

                <li>
                  <a
                    href="/framework"
                    className="text-gray-300 hover:text-white"
                  >
                    Our Institutional Framework
                  </a>
                </li>

                <li>
                  <a
                    href="/history"
                    className="text-gray-300 hover:text-white"
                  >
                    History
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    Leadership and governance
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    Our Impact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                More from the Forum
              </h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="/initiatives"
                    className="text-gray-300 hover:text-white"
                  >
                    Centres
                  </a>
                </li>

                <li>
                  <a
                    href="/meetings"
                    className="text-gray-300 hover:text-white"
                  >
                    Meetings
                  </a>
                </li>

                <li>
                  <a
                    href="/stakeholders"
                    className="text-gray-300 hover:text-white"
                  >
                    Stakeholders
                  </a>
                </li>

                <li>
                  <a
                    href="/agenda"
                    className="text-gray-300 hover:text-white"
                  >
                    Forum Stories
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    Press releases
                  </a>
                </li>

                <li>
                  <a
                    href="/gallery"
                    className="text-gray-300 hover:text-white"
                  >
                    Photo gallery
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    Podcasts
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    Videos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                Engage with us
              </h3>

              <ul className="space-y-3">
                <li>
                  <button
                    onClick={handleSignIn}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sign In
                  </button>
                </li>

                <li>
                  <a
                    href="/partners"
                    className="text-gray-300 hover:text-white"
                  >
                    Partner with us
                  </a>
                </li>

                <li>
                  <a
                    href="/join"
                    className="text-gray-300 hover:text-white"
                  >
                    Become a member
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                Quick links
              </h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    Sustainability at the Forum
                  </a>
                </li>

                <li>
                  <a
                    href="/careers"
                    className="text-gray-300 hover:text-white"
                  >
                    Careers
                  </a>
                </li>
              </ul>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">
                  Language editions
                </h4>

                <div className="flex space-x-2">
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white"
                  >
                    EN
                  </a>

                  <span className="text-gray-500">•</span>

                  <a
                    href="/pt"
                    className="text-gray-300 hover:text-white"
                  >
                    PT
                  </a>

                  <span className="text-gray-500">•</span>

                  <a
                    href="/es"
                    className="text-gray-300 hover:text-white"
                  >
                    ES
                  </a>

                  <span className="text-gray-500">•</span>

                  <a
                    href="/fr"
                    className="text-gray-300 hover:text-white"
                  >
                    FR
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>

                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <i className="ri-instagram-fill text-xl"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <i className="ri-youtube-fill text-xl"></i>
                </a>
              </div>

              <div className="text-sm text-gray-400 text-center">
                <p>© 2025 Africa Economic Forum</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Input({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  value,
  readOnly = false,
  min,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  min?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && ' *'}
      </label>

      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={value}
        readOnly={readOnly}
        min={min}
        step={step}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && ' *'}
      </label>

      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({
  label,
  name,
  required = false,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && ' *'}
      </label>

      <textarea
        name={name}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
      />
    </div>
  );
}
