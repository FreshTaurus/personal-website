import React from 'react';
import { GraduationCap, Code, Target, Award, MapPin, Calendar } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';

const About: React.FC = () => {
  const { data, isEditMode, updatePersonalInfo, updateSkills, updateInterests } = useCMS();

  const skills = [
    { category: 'Programming Languages', items: data.skills.programmingLanguages },
    { category: 'Web Development', items: data.skills.webDevelopment },
    { category: 'Databases', items: data.skills.databases },
    { category: 'Tools & Technologies', items: data.skills.tools },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {isEditMode ? (
              <EditableText
                value={data.personalInfo.bio}
                onChange={(value) => updatePersonalInfo({ bio: value })}
                className="text-xl text-gray-600 dark:text-gray-400"
                tag="span"
                multiline
              />
            ) : (
              data.personalInfo.bio
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
              {/* Placeholder for professional headshot */}
              <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-gray-400">📸</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isEditMode ? (
                  <EditableText
                    value={data.personalInfo.name}
                    onChange={(value) => updatePersonalInfo({ name: value })}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    tag="span"
                  />
                ) : (
                  data.personalInfo.name
                )}
              </h2>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">
                {isEditMode ? (
                  <EditableText
                    value={data.personalInfo.title}
                    onChange={(value) => updatePersonalInfo({ title: value })}
                    className="text-primary-600 dark:text-primary-400 font-semibold"
                    tag="span"
                  />
                ) : (
                  data.personalInfo.title
                )}
              </p>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {isEditMode ? (
                    <EditableText
                      value={data.personalInfo.location}
                      onChange={(value) => updatePersonalInfo({ location: value })}
                      className="text-sm text-gray-600 dark:text-gray-400"
                      tag="span"
                    />
                  ) : (
                    data.personalInfo.location
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Expected Graduation: {isEditMode ? (
                    <EditableText
                      value={data.personalInfo.graduationYear}
                      onChange={(value) => updatePersonalInfo({ graduationYear: value })}
                      className="text-sm text-gray-600 dark:text-gray-400"
                      tag="span"
                    />
                  ) : (
                    data.personalInfo.graduationYear
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Education */}
            <section>
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Borough of Manhattan Community College (BMCC)
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      Bachelor of Science in Computer Science
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2022 - 2024</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Currently pursuing my Bachelor's degree in Computer Science with a focus on 
                  software development, data structures, and algorithms. Maintaining a strong GPA 
                  while actively participating in coding competitions and hackathons.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Target className="w-4 h-4 mr-2" />
                  Transfer goal: Columbia University (Fall 2024)
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section>
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {skill.category}
                    </h3>
                    {isEditMode ? (
                      <EditableList
                        items={skill.items}
                        onChange={(items) => {
                          const categoryKey = skill.category === 'Programming Languages' ? 'programmingLanguages' :
                                           skill.category === 'Web Development' ? 'webDevelopment' :
                                           skill.category === 'Databases' ? 'databases' : 'tools';
                          updateSkills(categoryKey as keyof typeof data.skills, items);
                        }}
                        placeholder={`Add ${skill.category.toLowerCase()}...`}
                        className="space-y-2"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item: string, itemIndex: number) => (
                          <span
                            key={itemIndex}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Career Interests */}
            <section>
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Interests</h2>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  I'm passionate about building scalable web applications and exploring the intersection 
                  of technology and user experience. My goal is to become a full-stack developer with 
                  expertise in modern frameworks and cloud technologies.
                </p>
                {isEditMode ? (
                  <EditableList
                    items={data.interests}
                    onChange={updateInterests}
                    placeholder="Add career interest..."
                    className="space-y-2"
                  />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {data.interests.map((interest: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {interest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Personal Statement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Statement
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {isEditMode ? (
                    <EditableText
                      value={data.personalInfo.personalStatement}
                      onChange={(value) => updatePersonalInfo({ personalStatement: value })}
                      className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                      tag="span"
                      multiline
                    />
                  ) : (
                    `"${data.personalInfo.personalStatement}"`
                  )}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
