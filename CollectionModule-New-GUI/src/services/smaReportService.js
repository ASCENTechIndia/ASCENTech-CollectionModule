import apiClient from './apiClient'

export const smaReportService = {
  // Get SMA Summary Report
  getSMASummaryReport: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString()
      const endpoint = `/reports/sma-summary${queryParams ? `?${queryParams}` : ''}`
      const response = await apiClient.get(endpoint)
      return response
    } catch (error) {
      throw new Error(`Failed to fetch SMA Summary Report: ${error.message}`)
    }
  },

  // Get SMA Summary Report by Date Range
  getSMASummaryReportByDateRange: async (startDate, endDate, filters = {}) => {
    try {
      const allFilters = {
        startDate,
        endDate,
        ...filters,
      }
      return await this.getSMASummaryReport(allFilters)
    } catch (error) {
      throw new Error(`Failed to fetch SMA Summary Report: ${error.message}`)
    }
  },

  // Export SMA Summary Report
  exportSMASummaryReport: async (format = 'csv', filters = {}) => {
    try {
      const queryParams = new URLSearchParams({ ...filters, format }).toString()
      const endpoint = `/reports/sma-summary/export${queryParams ? `?${queryParams}` : ''}`
      const response = await apiClient.get(endpoint)
      return response
    } catch (error) {
      throw new Error(`Failed to export SMA Summary Report: ${error.message}`)
    }
  },

  // Get Report Metadata (columns, filter options, etc.)
  getReportMetadata: async () => {
    try {
      const response = await apiClient.get('/reports/sma-summary/metadata')
      return response
    } catch (error) {
      throw new Error(`Failed to fetch report metadata: ${error.message}`)
    }
  },

  // Get Available Filters
  getAvailableFilters: async () => {
    try {
      const response = await apiClient.get('/reports/sma-summary/filters')
      return response
    } catch (error) {
      throw new Error(`Failed to fetch available filters: ${error.message}`)
    }
  },
}

export default smaReportService
