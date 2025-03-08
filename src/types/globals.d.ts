export { }

export type Roles = 'admin' | 'user'

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles
		}
	}
}

export const InvoiceStatuses = ['draft', 'sent', 'paid', 'overdue', 'partially_paid', 'cancelled', 'pending'] as const

export type InvoiceStatus = typeof InvoiceStatuses[number]