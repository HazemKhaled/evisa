import { relations } from 'drizzle-orm';
import { countries, countriesI18n } from './countries';
import { visaTypes, visaTypesI18n } from './visa-types';
import { visaEligibility, visaEligibilityI18n } from './visa-eligibility';

// Countries relations
export const countriesRelations = relations(countries, ({ many }) => ({
  i18n: many(countriesI18n),
  visaTypes: many(visaTypes),
  destinationEligibility: many(visaEligibility, { relationName: 'destination' }),
  passportEligibility: many(visaEligibility, { relationName: 'passport' }),
}));

export const countriesI18nRelations = relations(countriesI18n, ({ one }) => ({
  country: one(countries, {
    fields: [countriesI18n.countryId],
    references: [countries.id],
  }),
}));

// Visa Types relations
export const visaTypesRelations = relations(visaTypes, ({ one, many }) => ({
  destination: one(countries, {
    fields: [visaTypes.destinationId],
    references: [countries.id],
  }),
  i18n: many(visaTypesI18n),
  eligibility: many(visaEligibility),
}));

export const visaTypesI18nRelations = relations(visaTypesI18n, ({ one }) => ({
  visaType: one(visaTypes, {
    fields: [visaTypesI18n.visaTypeId],
    references: [visaTypes.id],
  }),
}));

// Visa Eligibility relations
export const visaEligibilityRelations = relations(visaEligibility, ({ one, many }) => ({
  destination: one(countries, {
    fields: [visaEligibility.destinationId],
    references: [countries.id],
    relationName: 'destination',
  }),
  passportCountry: one(countries, {
    fields: [visaEligibility.passportId],
    references: [countries.id],
    relationName: 'passport',
  }),
  visaType: one(visaTypes, {
    fields: [visaEligibility.visaTypeId],
    references: [visaTypes.id],
  }),
  i18n: many(visaEligibilityI18n),
}));

export const visaEligibilityI18nRelations = relations(visaEligibilityI18n, ({ one }) => ({
  visaEligibility: one(visaEligibility, {
    fields: [visaEligibilityI18n.visaEligibilityId],
    references: [visaEligibility.id],
  }),
}));