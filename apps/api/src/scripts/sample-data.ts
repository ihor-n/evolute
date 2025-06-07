import mongoose from 'mongoose'

export const sampleUsers = [
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acme.com',
    phone: '+1-555-123-4567',
    company: 'Acme Manufacturing',
    department: 'Production',
    role: 'Supervisor',
    jobTitle: 'Production Line Supervisor',
    experience: {
      yearsInIndustry: 8,
      expertise: ['Lean Manufacturing', 'Quality Control', 'Team Leadership'],
      certifications: ['Six Sigma Green Belt', 'ISO 9001 Auditor']
    },
    preferences: {
      language: 'en',
      timezone: 'America/New_York',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '35-44',
      gender: 'male',
      education: "Bachelor's Degree"
    },
    workHistory: {
      currentPosition: 'Production Line Supervisor',
      previousPositions: ['Production Operator', 'Team Lead'],
      industrySpecialization: ['Automotive Manufacturing', 'Quality Control']
    },
    status: 'active',
    participation: {
      surveysCompleted: 12,
      surveysInvited: 15,
      lastResponseDate: new Date('2024-01-15'),
      responseRate: 0.8,
      avgResponseTime: 3.2,
      responseQuality: {
        avgCompletionRate: 0.95,
        avgResponseLength: 145,
        thoughtfulnessScore: 8.2
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 2, responseTime: 2.1 },
        { month: '2023-12', surveysCompleted: 3, responseTime: 3.8 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 4.2 },
        { month: '2023-10', surveysCompleted: 1, responseTime: 2.5 },
        { month: '2023-09', surveysCompleted: 4, responseTime: 3.1 }
      ],
      activityMetrics: {
        loginFrequency: 12,
        sessionDuration: 18.5,
        featuresUsed: ['survey_response', 'profile_update', 'dashboard_view'],
        lastLoginStreak: 5
      },
      feedbackProvided: {
        platformFeedback: 3,
        surveyFeedback: 8,
        featureRequests: 2
      }
    },
    address: {
      street: '123 Industrial Ave',
      city: 'Detroit',
      state: 'MI',
      country: 'USA',
      postalCode: '48201'
    },
    joinedAt: new Date('2023-01-01'),
    lastActive: new Date('2024-01-15'),
    metadata: {
      shiftPreference: 'morning',
      departmentCode: 'PROD-01'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@steel.com',
    phone: '+1-555-987-6543',
    company: 'Steel Dynamics',
    department: 'Quality Assurance',
    role: 'Manager',
    jobTitle: 'QA Manager',
    experience: {
      yearsInIndustry: 12,
      expertise: ['Quality Management', 'Process Optimization', 'Regulatory Compliance'],
      certifications: ['Six Sigma Black Belt', 'ASQ Certified Manager']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Chicago',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '45-54',
      gender: 'female',
      education: "Master's Degree"
    },
    workHistory: {
      currentPosition: 'QA Manager',
      previousPositions: ['QA Specialist', 'Manufacturing Engineer'],
      industrySpecialization: ['Steel Manufacturing', 'Process Control']
    },
    status: 'active',
    participation: {
      surveysCompleted: 24,
      surveysInvited: 26,
      lastResponseDate: new Date('2024-01-20'),
      responseRate: 0.92,
      avgResponseTime: 1.8,
      responseQuality: {
        avgCompletionRate: 0.98,
        avgResponseLength: 220,
        thoughtfulnessScore: 9.1
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 3, responseTime: 1.2 },
        { month: '2023-12', surveysCompleted: 4, responseTime: 1.5 },
        { month: '2023-11', surveysCompleted: 3, responseTime: 2.1 },
        { month: '2023-10', surveysCompleted: 3, responseTime: 1.8 },
        { month: '2023-09', surveysCompleted: 4, responseTime: 1.9 },
        { month: '2023-08', surveysCompleted: 3, responseTime: 2.0 },
        { month: '2023-07', surveysCompleted: 4, responseTime: 1.6 }
      ],
      activityMetrics: {
        loginFrequency: 18,
        sessionDuration: 25.3,
        featuresUsed: ['survey_response', 'analytics_view', 'team_management', 'reporting'],
        lastLoginStreak: 12
      },
      feedbackProvided: {
        platformFeedback: 7,
        surveyFeedback: 15,
        featureRequests: 5
      }
    },
    address: {
      street: '456 Steel Mill Rd',
      city: 'Gary',
      state: 'IN',
      country: 'USA',
      postalCode: '46404'
    },
    joinedAt: new Date('2022-06-15'),
    lastActive: new Date('2024-01-20'),
    metadata: {
      specializations: ['Heat Treatment', 'Metal Testing'],
      projectLead: true
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'm.chen@tech.com',
    phone: '+1-555-789-0123',
    company: 'Tech Manufacturing Solutions',
    department: 'Engineering',
    role: 'Engineer',
    jobTitle: 'Process Engineer',
    experience: {
      yearsInIndustry: 5,
      expertise: ['Automation', 'robotics', 'PLC Programming'],
      certifications: ['Professional Engineer', 'Automation Certified Expert']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '25-34',
      gender: 'male',
      education: "Master's Degree"
    },
    workHistory: {
      currentPosition: 'Process Engineer',
      previousPositions: ['Junior Engineer', 'Engineering Intern'],
      industrySpecialization: ['Electronics Manufacturing', 'Automation']
    },
    status: 'active',
    participation: {
      surveysCompleted: 8,
      surveysInvited: 11,
      lastResponseDate: new Date('2024-01-18'),
      responseRate: 0.73,
      avgResponseTime: 4.5,
      responseQuality: {
        avgCompletionRate: 0.88,
        avgResponseLength: 98,
        thoughtfulnessScore: 6.8
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 2, responseTime: 3.5 },
        { month: '2023-12', surveysCompleted: 1, responseTime: 6.2 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 4.1 },
        { month: '2023-10', surveysCompleted: 1, responseTime: 5.8 },
        { month: '2023-09', surveysCompleted: 2, responseTime: 3.9 }
      ],
      activityMetrics: {
        loginFrequency: 8,
        sessionDuration: 12.7,
        featuresUsed: ['survey_response', 'dashboard_view'],
        lastLoginStreak: 2
      },
      feedbackProvided: {
        platformFeedback: 1,
        surveyFeedback: 3,
        featureRequests: 1
      }
    },
    address: {
      street: '789 Tech Park Way',
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      postalCode: '95110'
    },
    joinedAt: new Date('2023-03-15'),
    lastActive: new Date('2024-01-18'),
    metadata: {
      projectAreas: ['Automation', 'Process Optimization'],
      teamSize: 5
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'e.davis@precision.com',
    phone: '+1-555-456-7890',
    company: 'Precision Machining Inc.',
    department: 'Manufacturing',
    role: 'CNC Operator',
    jobTitle: 'CNC Machinist',
    experience: {
      yearsInIndustry: 3,
      expertise: ['CNC Programming', 'Precision Machining', 'Metrology'],
      certifications: ['NIMS Level 1 CNC Operator']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Chicago',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '22-29',
      gender: 'female',
      education: "Associate's Degree"
    },
    workHistory: {
      currentPosition: 'CNC Machinist',
      previousPositions: ['Machine Operator', 'Shop Assistant'],
      industrySpecialization: ['Precision Manufacturing', 'Quality Control']
    },
    status: 'active',
    participation: {
      surveysCompleted: 5,
      surveysInvited: 7,
      lastResponseDate: new Date('2024-01-12'),
      responseRate: 0.71,
      avgResponseTime: 5.8,
      responseQuality: {
        avgCompletionRate: 0.82,
        avgResponseLength: 67,
        thoughtfulnessScore: 5.9
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 1, responseTime: 4.2 },
        { month: '2023-12', surveysCompleted: 1, responseTime: 7.1 },
        { month: '2023-11', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-10', surveysCompleted: 2, responseTime: 6.5 },
        { month: '2023-09', surveysCompleted: 1, responseTime: 5.8 }
      ],
      activityMetrics: {
        loginFrequency: 6,
        sessionDuration: 9.2,
        featuresUsed: ['survey_response'],
        lastLoginStreak: 1
      },
      feedbackProvided: {
        platformFeedback: 0,
        surveyFeedback: 2,
        featureRequests: 0
      }
    },
    address: {
      street: '321 Factory Rd',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601'
    },
    joinedAt: new Date('2023-07-01'),
    lastActive: new Date('2024-01-12'),
    metadata: {
      trainingNeeds: ['Lean Manufacturing', 'Geometric Dimensioning'],
      specialEquipment: ['Coordinate Measuring Machine']
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'David',
    lastName: 'Lee',
    email: 'd.lee@aero.com',
    phone: '+1-555-987-2345',
    company: 'Aerospace Manufacturing',
    department: 'Engineering',
    role: 'Design Engineer',
    jobTitle: 'Aerospace Design Engineer',
    experience: {
      yearsInIndustry: 10,
      expertise: ['CAD Modeling', 'Structural Analysis', 'Aerodynamics'],
      certifications: ['Professional Engineering License', 'CATIA Certification']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '35-44',
      gender: 'male',
      education: "Master's Degree"
    },
    workHistory: {
      currentPosition: 'Aerospace Design Engineer',
      previousPositions: ['Systems Engineer', 'Design Intern'],
      industrySpecialization: ['Aerospace Manufacturing', 'Composites']
    },
    status: 'active',
    participation: {
      surveysCompleted: 18,
      surveysInvited: 20,
      lastResponseDate: new Date('2024-01-25'),
      responseRate: 0.9,
      avgResponseTime: 2.1,
      responseQuality: {
        avgCompletionRate: 0.96,
        avgResponseLength: 185,
        thoughtfulnessScore: 8.7
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 3, responseTime: 1.8 },
        { month: '2023-12', surveysCompleted: 2, responseTime: 2.3 },
        { month: '2023-11', surveysCompleted: 3, responseTime: 1.9 },
        { month: '2023-10', surveysCompleted: 2, responseTime: 2.4 },
        { month: '2023-09', surveysCompleted: 3, responseTime: 2.0 },
        { month: '2023-08', surveysCompleted: 2, responseTime: 2.1 },
        { month: '2023-07', surveysCompleted: 3, responseTime: 2.2 }
      ],
      activityMetrics: {
        loginFrequency: 15,
        sessionDuration: 22.1,
        featuresUsed: ['survey_response', 'analytics_view', 'profile_update', 'collaboration'],
        lastLoginStreak: 8
      },
      feedbackProvided: {
        platformFeedback: 4,
        surveyFeedback: 12,
        featureRequests: 3
      }
    },
    address: {
      street: '987 Aerospace Blvd',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001'
    },
    joinedAt: new Date('2021-09-01'),
    lastActive: new Date('2024-01-25'),
    metadata: {
      projects: ['Next-Gen Fighter Jet', 'Satellite Structures'],
      securityClearance: 'Secret'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Samantha',
    lastName: 'Rodriguez',
    email: 's.rodriguez@food.com',
    phone: '+1-555-654-3210',
    company: 'FoodCo Manufacturing',
    department: 'Quality Control',
    role: 'Inspector',
    jobTitle: 'Quality Inspector',
    experience: {
      yearsInIndustry: 6,
      expertise: ['Food Safety', 'Regulatory Compliance', 'Auditing'],
      certifications: ['HACCP Certified', 'ISO 22000 Lead Auditor']
    },
    preferences: {
      language: 'en',
      timezone: 'America/New_York',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '30-39',
      gender: 'female',
      education: "Bachelor's Degree"
    },
    workHistory: {
      currentPosition: 'Quality Inspector',
      previousPositions: ['Quality Technician', 'Production Worker'],
      industrySpecialization: ['Food Manufacturing', 'Quality Assurance']
    },
    status: 'active',
    participation: {
      surveysCompleted: 15,
      surveysInvited: 17,
      lastResponseDate: new Date('2024-01-22'),
      responseRate: 0.88,
      avgResponseTime: 2.8,
      responseQuality: {
        avgCompletionRate: 0.93,
        avgResponseLength: 156,
        thoughtfulnessScore: 8.0
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 2, responseTime: 2.1 },
        { month: '2023-12', surveysCompleted: 3, responseTime: 2.9 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 3.2 },
        { month: '2023-10', surveysCompleted: 2, responseTime: 2.5 },
        { month: '2023-09', surveysCompleted: 3, responseTime: 2.8 },
        { month: '2023-08', surveysCompleted: 3, responseTime: 3.1 }
      ],
      activityMetrics: {
        loginFrequency: 14,
        sessionDuration: 19.8,
        featuresUsed: ['survey_response', 'quality_tracking', 'compliance_reports'],
        lastLoginStreak: 6
      },
      feedbackProvided: {
        platformFeedback: 5,
        surveyFeedback: 9,
        featureRequests: 4
      }
    },
    address: {
      street: '654 Food Processing Rd',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001'
    },
    joinedAt: new Date('2022-11-01'),
    lastActive: new Date('2024-01-22'),
    metadata: {
      trainings: ['Sensory Evaluation', 'Advanced Food Microbiology'],
      fluentLanguages: ['English', 'Spanish']
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'r.wilson@pharma.com',
    phone: '+1-555-321-9876',
    company: 'PharmaCore Manufacturing',
    department: 'Research & Development',
    role: 'Senior Scientist',
    jobTitle: 'Senior Research Scientist',
    experience: {
      yearsInIndustry: 15,
      expertise: ['Drug Development', 'Analytical Chemistry', 'Regulatory Affairs'],
      certifications: ['PhD Chemistry', 'Good Manufacturing Practice']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Boston',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '45-54',
      gender: 'male',
      education: 'PhD'
    },
    workHistory: {
      currentPosition: 'Senior Research Scientist',
      previousPositions: ['Research Scientist', 'Lab Technician'],
      industrySpecialization: ['Pharmaceutical Manufacturing', 'Chemical Analysis']
    },
    status: 'active',
    participation: {
      surveysCompleted: 32,
      surveysInvited: 34,
      lastResponseDate: new Date('2024-01-26'),
      responseRate: 0.94,
      avgResponseTime: 1.3,
      responseQuality: {
        avgCompletionRate: 0.99,
        avgResponseLength: 275,
        thoughtfulnessScore: 9.4
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 4, responseTime: 1.1 },
        { month: '2023-12', surveysCompleted: 5, responseTime: 1.2 },
        { month: '2023-11', surveysCompleted: 4, responseTime: 1.4 },
        { month: '2023-10', surveysCompleted: 5, responseTime: 1.3 },
        { month: '2023-09', surveysCompleted: 4, responseTime: 1.5 },
        { month: '2023-08', surveysCompleted: 5, responseTime: 1.2 },
        { month: '2023-07', surveysCompleted: 5, responseTime: 1.4 }
      ],
      activityMetrics: {
        loginFrequency: 22,
        sessionDuration: 31.2,
        featuresUsed: ['survey_response', 'research_tools', 'data_export', 'collaboration', 'analytics_view'],
        lastLoginStreak: 15
      },
      feedbackProvided: {
        platformFeedback: 12,
        surveyFeedback: 18,
        featureRequests: 8
      }
    },
    address: {
      street: '789 Research Park Dr',
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      postalCode: '02101'
    },
    joinedAt: new Date('2021-03-01'),
    lastActive: new Date('2024-01-26'),
    metadata: {
      researchAreas: ['Oncology', 'Immunotherapy'],
      publications: 23
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Angela',
    lastName: 'Thompson',
    email: 'a.thompson@textiles.com',
    phone: '+1-555-147-2580',
    company: 'Global Textiles Inc.',
    department: 'Production',
    role: 'Operator',
    jobTitle: 'Textile Machine Operator',
    experience: {
      yearsInIndustry: 2,
      expertise: ['Textile Production', 'Machine Operation'],
      certifications: ['Basic Safety Training']
    },
    preferences: {
      language: 'en',
      timezone: 'America/New_York',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '18-24',
      gender: 'female',
      education: 'High School'
    },
    workHistory: {
      currentPosition: 'Textile Machine Operator',
      previousPositions: ['Trainee'],
      industrySpecialization: ['Textile Manufacturing']
    },
    status: 'active',
    participation: {
      surveysCompleted: 3,
      surveysInvited: 8,
      lastResponseDate: new Date('2023-12-28'),
      responseRate: 0.38,
      avgResponseTime: 8.5,
      responseQuality: {
        avgCompletionRate: 0.65,
        avgResponseLength: 42,
        thoughtfulnessScore: 4.2
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-12', surveysCompleted: 1, responseTime: 9.2 },
        { month: '2023-11', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-10', surveysCompleted: 1, responseTime: 7.8 },
        { month: '2023-09', surveysCompleted: 1, responseTime: 8.5 }
      ],
      activityMetrics: {
        loginFrequency: 3,
        sessionDuration: 6.1,
        featuresUsed: ['survey_response'],
        lastLoginStreak: 0
      },
      feedbackProvided: {
        platformFeedback: 0,
        surveyFeedback: 1,
        featureRequests: 0
      }
    },
    address: {
      street: '432 Mill Street',
      city: 'Charlotte',
      state: 'NC',
      country: 'USA',
      postalCode: '28201'
    },
    joinedAt: new Date('2023-08-15'),
    lastActive: new Date('2023-12-28'),
    metadata: {
      shiftType: 'night',
      trainingStatus: 'in-progress'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Carlos',
    lastName: 'Martinez',
    email: 'c.martinez@construction.com',
    phone: '+1-555-963-7410',
    company: 'BuildRight Construction Materials',
    department: 'Operations',
    role: 'Foreman',
    jobTitle: 'Construction Foreman',
    experience: {
      yearsInIndustry: 12,
      expertise: ['Construction Management', 'Safety Protocols', 'Material Testing'],
      certifications: ['OSHA 30-Hour', 'Construction Safety Supervisor']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Phoenix',
      communicationChannel: 'phone'
    },
    demographics: {
      ageRange: '35-44',
      gender: 'male',
      education: "Associate's Degree"
    },
    workHistory: {
      currentPosition: 'Construction Foreman',
      previousPositions: ['Senior Worker', 'Construction Worker'],
      industrySpecialization: ['Heavy Construction', 'Infrastructure']
    },
    status: 'active',
    participation: {
      surveysCompleted: 9,
      surveysInvited: 14,
      lastResponseDate: new Date('2024-01-19'),
      responseRate: 0.64,
      avgResponseTime: 6.2,
      responseQuality: {
        avgCompletionRate: 0.78,
        avgResponseLength: 89,
        thoughtfulnessScore: 6.5
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 2, responseTime: 4.8 },
        { month: '2023-12', surveysCompleted: 1, responseTime: 8.1 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 6.3 },
        { month: '2023-10', surveysCompleted: 1, responseTime: 7.2 },
        { month: '2023-09', surveysCompleted: 2, responseTime: 5.8 },
        { month: '2023-08', surveysCompleted: 1, responseTime: 6.9 }
      ],
      activityMetrics: {
        loginFrequency: 7,
        sessionDuration: 11.4,
        featuresUsed: ['survey_response', 'safety_reports'],
        lastLoginStreak: 3
      },
      feedbackProvided: {
        platformFeedback: 2,
        surveyFeedback: 4,
        featureRequests: 1
      }
    },
    address: {
      street: '876 Construction Way',
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      postalCode: '85001'
    },
    joinedAt: new Date('2022-12-01'),
    lastActive: new Date('2024-01-19'),
    metadata: {
      safetyRating: 'excellent',
      teamSize: 12
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Lisa',
    lastName: 'Park',
    email: 'l.park@electronics.com',
    phone: '+1-555-852-9630',
    company: 'Advanced Electronics Corp',
    department: 'Quality Assurance',
    role: 'Senior Technician',
    jobTitle: 'QA Senior Technician',
    experience: {
      yearsInIndustry: 7,
      expertise: ['Electronic Testing', 'Component Analysis', 'Statistical Process Control'],
      certifications: ['IPC Certification', 'Six Sigma Green Belt']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '30-39',
      gender: 'female',
      education: "Bachelor's Degree"
    },
    workHistory: {
      currentPosition: 'QA Senior Technician',
      previousPositions: ['QA Technician', 'Test Operator'],
      industrySpecialization: ['Electronics Manufacturing', 'Semiconductor Testing']
    },
    status: 'active',
    participation: {
      surveysCompleted: 21,
      surveysInvited: 23,
      lastResponseDate: new Date('2024-01-23'),
      responseRate: 0.91,
      avgResponseTime: 2.4,
      responseQuality: {
        avgCompletionRate: 0.94,
        avgResponseLength: 168,
        thoughtfulnessScore: 8.3
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 3, responseTime: 2.1 },
        { month: '2023-12', surveysCompleted: 3, responseTime: 2.5 },
        { month: '2023-11', surveysCompleted: 3, responseTime: 2.8 },
        { month: '2023-10', surveysCompleted: 3, responseTime: 2.2 },
        { month: '2023-09', surveysCompleted: 3, responseTime: 2.4 },
        { month: '2023-08', surveysCompleted: 3, responseTime: 2.6 },
        { month: '2023-07', surveysCompleted: 3, responseTime: 2.3 }
      ],
      activityMetrics: {
        loginFrequency: 16,
        sessionDuration: 20.7,
        featuresUsed: ['survey_response', 'quality_metrics', 'trend_analysis', 'reporting'],
        lastLoginStreak: 9
      },
      feedbackProvided: {
        platformFeedback: 6,
        surveyFeedback: 11,
        featureRequests: 4
      }
    },
    address: {
      street: '234 Silicon Valley Blvd',
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      postalCode: '95112'
    },
    joinedAt: new Date('2022-04-01'),
    lastActive: new Date('2024-01-23'),
    metadata: {
      specializations: ['RF Testing', 'Signal Analysis'],
      menteeCount: 3
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'James',
    lastName: 'Anderson',
    email: 'j.anderson@mining.com',
    phone: '+1-555-741-8520',
    company: 'Rocky Mountain Mining Co.',
    department: 'Operations',
    role: 'Equipment Operator',
    jobTitle: 'Heavy Equipment Operator',
    experience: {
      yearsInIndustry: 9,
      expertise: ['Heavy Machinery', 'Mining Operations', 'Equipment Maintenance'],
      certifications: ['Heavy Equipment License', 'Mine Safety Training']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Denver',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '30-39',
      gender: 'male',
      education: 'High School'
    },
    workHistory: {
      currentPosition: 'Heavy Equipment Operator',
      previousPositions: ['Equipment Assistant', 'General Laborer'],
      industrySpecialization: ['Mining Operations', 'Heavy Equipment']
    },
    status: 'inactive',
    participation: {
      surveysCompleted: 4,
      surveysInvited: 12,
      lastResponseDate: new Date('2023-11-08'),
      responseRate: 0.33,
      avgResponseTime: 12.3,
      responseQuality: {
        avgCompletionRate: 0.71,
        avgResponseLength: 55,
        thoughtfulnessScore: 5.1
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-12', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-11', surveysCompleted: 1, responseTime: 14.2 },
        { month: '2023-10', surveysCompleted: 1, responseTime: 11.8 },
        { month: '2023-09', surveysCompleted: 0, responseTime: 0 },
        { month: '2023-08', surveysCompleted: 1, responseTime: 10.5 },
        { month: '2023-07', surveysCompleted: 1, responseTime: 12.8 }
      ],
      activityMetrics: {
        loginFrequency: 2,
        sessionDuration: 7.3,
        featuresUsed: ['survey_response'],
        lastLoginStreak: 0
      },
      feedbackProvided: {
        platformFeedback: 0,
        surveyFeedback: 1,
        featureRequests: 0
      }
    },
    address: {
      street: '567 Mountain Ridge Rd',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      postalCode: '80201'
    },
    joinedAt: new Date('2023-02-15'),
    lastActive: new Date('2023-11-08'),
    metadata: {
      equipmentTypes: ['Excavator', 'Bulldozer', 'Dump Truck'],
      safetyIncidents: 0
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Patricia',
    lastName: 'Johnson',
    email: 'p.johnson@chemical.com',
    phone: '+1-555-159-7530',
    company: 'ChemTech Industries',
    department: 'Safety & Environmental',
    role: 'Specialist',
    jobTitle: 'Environmental Safety Specialist',
    experience: {
      yearsInIndustry: 6,
      expertise: ['Environmental Compliance', 'Safety Audits', 'Chemical Handling'],
      certifications: ['Certified Safety Professional', 'Environmental Management']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Chicago',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '30-39',
      gender: 'female',
      education: "Master's Degree"
    },
    workHistory: {
      currentPosition: 'Environmental Safety Specialist',
      previousPositions: ['Safety Coordinator', 'Environmental Technician'],
      industrySpecialization: ['Chemical Manufacturing', 'Environmental Safety']
    },
    status: 'active',
    participation: {
      surveysCompleted: 19,
      surveysInvited: 21,
      lastResponseDate: new Date('2024-01-24'),
      responseRate: 0.9,
      avgResponseTime: 2.2,
      responseQuality: {
        avgCompletionRate: 0.97,
        avgResponseLength: 203,
        thoughtfulnessScore: 8.8
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 3, responseTime: 1.9 },
        { month: '2023-12', surveysCompleted: 3, responseTime: 2.1 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 2.5 },
        { month: '2023-10', surveysCompleted: 3, responseTime: 2.0 },
        { month: '2023-09', surveysCompleted: 3, responseTime: 2.3 },
        { month: '2023-08', surveysCompleted: 2, responseTime: 2.4 },
        { month: '2023-07', surveysCompleted: 3, responseTime: 2.1 }
      ],
      activityMetrics: {
        loginFrequency: 17,
        sessionDuration: 24.5,
        featuresUsed: ['survey_response', 'safety_compliance', 'environmental_tracking', 'audit_reports'],
        lastLoginStreak: 11
      },
      feedbackProvided: {
        platformFeedback: 8,
        surveyFeedback: 13,
        featureRequests: 6
      }
    },
    address: {
      street: '345 Chemical Plant Rd',
      city: 'Houston',
      state: 'TX',
      country: 'USA',
      postalCode: '77001'
    },
    joinedAt: new Date('2022-08-01'),
    lastActive: new Date('2024-01-24'),
    metadata: {
      certificationRenewal: '2024-06-01',
      auditsPerfomed: 24
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Kevin',
    lastName: 'Brooks',
    email: 'k.brooks@packaging.com',
    phone: '+1-555-357-4680',
    company: 'Premier Packaging Solutions',
    department: 'Production',
    role: 'Supervisor',
    jobTitle: 'Production Supervisor',
    experience: {
      yearsInIndustry: 11,
      expertise: ['Production Management', 'Lean Manufacturing', 'Team Leadership'],
      certifications: ['Lean Six Sigma Black Belt', 'Production Management Certificate']
    },
    preferences: {
      language: 'en',
      timezone: 'America/New_York',
      communicationChannel: 'both'
    },
    demographics: {
      ageRange: '35-44',
      gender: 'male',
      education: "Bachelor's Degree"
    },
    workHistory: {
      currentPosition: 'Production Supervisor',
      previousPositions: ['Team Lead', 'Production Operator'],
      industrySpecialization: ['Packaging Manufacturing', 'Process Optimization']
    },
    status: 'active',
    participation: {
      surveysCompleted: 16,
      surveysInvited: 18,
      lastResponseDate: new Date('2024-01-21'),
      responseRate: 0.89,
      avgResponseTime: 2.6,
      responseQuality: {
        avgCompletionRate: 0.92,
        avgResponseLength: 174,
        thoughtfulnessScore: 8.1
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 2, responseTime: 2.3 },
        { month: '2023-12', surveysCompleted: 3, responseTime: 2.7 },
        { month: '2023-11', surveysCompleted: 2, responseTime: 2.9 },
        { month: '2023-10', surveysCompleted: 3, responseTime: 2.4 },
        { month: '2023-09', surveysCompleted: 2, responseTime: 2.8 },
        { month: '2023-08', surveysCompleted: 2, responseTime: 2.5 },
        { month: '2023-07', surveysCompleted: 2, responseTime: 2.6 }
      ],
      activityMetrics: {
        loginFrequency: 13,
        sessionDuration: 17.9,
        featuresUsed: ['survey_response', 'team_management', 'production_metrics', 'efficiency_tracking'],
        lastLoginStreak: 7
      },
      feedbackProvided: {
        platformFeedback: 5,
        surveyFeedback: 10,
        featureRequests: 3
      }
    },
    address: {
      street: '678 Industrial Park Ave',
      city: 'Atlanta',
      state: 'GA',
      country: 'USA',
      postalCode: '30301'
    },
    joinedAt: new Date('2022-01-15'),
    lastActive: new Date('2024-01-21'),
    metadata: {
      teamSize: 18,
      efficiencyImprovement: '15%'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Monica',
    lastName: 'Chang',
    email: 'm.chang@biotech.com',
    phone: '+1-555-468-1290',
    company: 'BioTech Innovations',
    department: 'Research & Development',
    role: 'Lab Manager',
    jobTitle: 'Laboratory Manager',
    experience: {
      yearsInIndustry: 13,
      expertise: ['Biotechnology', 'Laboratory Management', 'Research Coordination'],
      certifications: ['PhD Molecular Biology', 'Laboratory Safety Certification']
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      communicationChannel: 'email'
    },
    demographics: {
      ageRange: '35-44',
      gender: 'female',
      education: 'PhD'
    },
    workHistory: {
      currentPosition: 'Laboratory Manager',
      previousPositions: ['Senior Research Associate', 'Research Associate'],
      industrySpecialization: ['Biotechnology', 'Pharmaceutical Research']
    },
    status: 'active',
    participation: {
      surveysCompleted: 28,
      surveysInvited: 30,
      lastResponseDate: new Date('2024-01-25'),
      responseRate: 0.93,
      avgResponseTime: 1.7,
      responseQuality: {
        avgCompletionRate: 0.98,
        avgResponseLength: 245,
        thoughtfulnessScore: 9.2
      },
      engagementHistory: [
        { month: '2024-01', surveysCompleted: 4, responseTime: 1.5 },
        { month: '2023-12', surveysCompleted: 4, responseTime: 1.6 },
        { month: '2023-11', surveysCompleted: 4, responseTime: 1.8 },
        { month: '2023-10', surveysCompleted: 4, responseTime: 1.7 },
        { month: '2023-09', surveysCompleted: 4, responseTime: 1.9 },
        { month: '2023-08', surveysCompleted: 4, responseTime: 1.6 },
        { month: '2023-07', surveysCompleted: 4, responseTime: 1.8 }
      ],
      activityMetrics: {
        loginFrequency: 20,
        sessionDuration: 28.4,
        featuresUsed: [
          'survey_response',
          'research_collaboration',
          'data_analysis',
          'project_management',
          'team_coordination'
        ],
        lastLoginStreak: 13
      },
      feedbackProvided: {
        platformFeedback: 10,
        surveyFeedback: 16,
        featureRequests: 7
      }
    },
    address: {
      street: '890 Biotech Campus Dr',
      city: 'San Diego',
      state: 'CA',
      country: 'USA',
      postalCode: '92101'
    },
    joinedAt: new Date('2021-11-01'),
    lastActive: new Date('2024-01-25'),
    metadata: {
      researchGrants: 3,
      teamSize: 8,
      publications: 17
    }
  }
]

const user1Id = sampleUsers[0]._id
const user2Id = sampleUsers[1]._id
const user3Id = sampleUsers[2]._id
const user4Id = sampleUsers[3]._id
const user5Id = sampleUsers[4]._id

export const sampleManufacturers = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Acme Manufacturing',
    industry: 'Automotive',
    userIds: [user1Id, user2Id],
    contactPerson: {
      name: 'Robert Johnson',
      email: 'r.johnson@acme.com',
      phone: '+1-555-111-2222'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Steel Dynamics',
    industry: 'Steel',
    userIds: [user2Id, user3Id],
    contactPerson: {
      name: 'Sarah Williams',
      email: 's.williams@steel.com',
      phone: '+1-555-333-4444'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tech Manufacturing Solutions',
    industry: 'Electronics',
    userIds: [user3Id, user4Id, user1Id],
    contactPerson: {
      name: 'Jennifer Chen',
      email: 'j.chen@tech.com',
      phone: '+1-555-777-8888'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Precision Machining Inc.',
    industry: 'Machining',
    userIds: [user4Id],
    contactPerson: {
      name: 'Michael Thompson',
      email: 'm.thompson@precision.com',
      phone: '+1-555-222-3333'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Aerospace Manufacturing',
    industry: 'Aerospace',
    userIds: [user5Id, user2Id, user4Id],
    contactPerson: {
      name: 'Emily Chen',
      email: 'e.chen@aero.com',
      phone: '+1-555-444-5555'
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'FoodCo Manufacturing',
    industry: 'Food',
    userIds: [user5Id, user1Id],
    contactPerson: {
      name: 'Juan Gonzalez',
      email: 'j.gonzalez@food.com',
      phone: '+1-555-999-0000'
    }
  }
]
