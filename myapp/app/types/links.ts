export interface Link {
      id: number;
        code: string;
          original_url: string;
            clicks: number;
              created_at: Date;
              }

              export interface CreateLinkInput {
                originalUrl: string;
                }

                export interface CreateLinkResult {
                  code: string;
                    shortUrl: string;
                    }
export interface LinkWithClicks {
    code: string;
      originalUrl: string;
        createdAt: string;
          clicks: number;
          }
