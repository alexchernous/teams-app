/* eslint-disable no-undef */
export default {
  get: jest.fn().mockResolvedValue({ data: {} }),
  all: jest.fn().mockResolvedValue([{ data: {} }]),
};
