export type RtkErrortypes = {
  data: {
    code: string | number;
    errors: string;
    message: string;
    success: boolean;
  };
  status: number;
};
