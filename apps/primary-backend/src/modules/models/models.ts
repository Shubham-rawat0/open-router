export namespace ModelsModel {
  export type GetModelsResponse = {
    models: {
      id: string;
      name: string;
      slug: string;
      company: {
        id: string;
        name: string;
        website: string;
      };
    }[];
  };

  export type GetProvidersResponse = {
    providers: {
      id: string;
      name: string;
      website: string;
    }[];
  };

  export type GetModelProvidersResponse = {
    providers: {
      id: string;
      providerId: string;
      providerName: string;
      providerWebsite: string;
      inputTokenCost: number;
      outputTokenCost: number;
    }[];
  };
}
