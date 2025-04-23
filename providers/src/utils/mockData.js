export const ProviderStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
};

export const getMockProviders = () => {
  return [
    {
      id: "1",
      npi: "1234567890",
      firstName: "Sarah",
      lastName: "Johnson",
      credentials: ["MD", "FACP"],
      specialties: [
        { name: "Cardiology", code: "CARD" },
        { name: "Internal Medicine", code: "IM" },
      ],
      status: ProviderStatus.ACTIVE,
      address: {
        street: "123 Medical Center Blvd",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
      },
      phone: "(312) 555-1234",
      email: "sarah.johnson@healthnetwork.com",
      acceptingNewPatients: true,
      networkStatus: "In-Network",
      languages: ["English", "Spanish"],
      providerCredentials: [
        {
          type: "Medical License",
          number: "IL-12345",
          issueDate: "2018-03-15",
          expirationDate: "2026-03-15",
        },
      ],
      bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in preventative cardiology and women's heart health.",
    },
    {
      id: "2",
      npi: "2345678901",
      firstName: "Michael",
      lastName: "Chen",
      credentials: ["MD", "PhD"],
      specialties: [{ name: "Neurology", code: "NEUR" }],
      status: ProviderStatus.ACTIVE,
      address: {
        street: "456 Neuroscience Way",
        city: "Boston",
        state: "MA",
        zipCode: "02114",
      },
      phone: "(617) 555-9876",
      email: "michael.chen@neurocare.org",
      acceptingNewPatients: true,
      networkStatus: "In-Network",
      languages: ["English", "Mandarin", "Cantonese"],
      providerCredentials: [
        {
          type: "Medical License",
          number: "MA-54321",
          issueDate: "2015-05-10",
          expirationDate: "2025-05-10",
        },
      ],
      bio: "Dr. Chen is a neurologist specializing in stroke prevention and treatment. His research focuses on innovative therapies for neurological recovery.",
    },
    {
      id: "3",
      npi: "3456789012",
      firstName: "Aisha",
      lastName: "Patel",
      credentials: ["DO", "MPH"],
      specialties: [
        { name: "Pediatrics", code: "PED" },
        { name: "Adolescent Medicine", code: "ADO" },
      ],
      status: ProviderStatus.ACTIVE,
      address: {
        street: "789 Children's Plaza",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
      },
      phone: "(206) 555-3456",
      email: "aisha.patel@kidshealth.org",
      acceptingNewPatients: true,
      networkStatus: "In-Network",
      languages: ["English", "Hindi", "Gujarati"],
      providerCredentials: [
        {
          type: "Medical License",
          number: "WA-98765",
          issueDate: "2019-11-20",
          expirationDate: "2027-11-20",
        },
      ],
      bio: "Dr. Patel is passionate about child and adolescent health. She takes a holistic approach to healthcare, focusing on both physical and mental well-being.",
    },
  ];
};

export const getStatusColor = (status) => {
  switch (status) {
    case ProviderStatus.ACTIVE:
      return "success";
    case ProviderStatus.INACTIVE:
      return "error";
    case ProviderStatus.PENDING:
      return "warning";
    case ProviderStatus.SUSPENDED:
      return "error";
    default:
      return "default";
  }
};
