export interface IStatistics {
    id: string;
    type: string;
    attributes: {
        id: string;
        statistics: [];
    }
}

export interface IStatisticsResponsePayload {
    data: IStatistics;
  }