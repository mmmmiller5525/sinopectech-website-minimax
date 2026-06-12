"use client";
import { useLang } from "@/components/LangProvider";
import { InquiryForm } from "@/components/InquiryForm";
import type { Contact, Company } from "@/lib/types";

export function ContactContent({ contact, company }: { contact: Contact; company: Company }) {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container-x grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.contact.title}</h1>
          <p className="mt-2 text-gray-600">{t.contact.subtitle}</p>
          <div className="mt-8 space-y-6">
            <div className="card p-6">
              <div className="text-xs uppercase tracking-wider text-brand-700">{t.contact.factoryLabel}</div>
              <div className="mt-2 text-lg font-semibold">{company.name_en}</div>
              <div className="text-sm text-gray-600">{company.address_en}</div>
              <div className="mt-3 grid gap-1 text-sm">
                {contact.phone && <div><span className="text-gray-500">{t.contact.phoneLabel}:</span> <a href={`tel:${contact.phone}`} className="text-brand-700 hover:underline">{contact.phone}</a></div>}
                {contact.email && <div><span className="text-gray-500">{t.contact.emailLabel}:</span> <a href={`mailto:${contact.email}`} className="text-brand-700 hover:underline">{contact.email}</a></div>}
                {contact.wechat && <div><span className="text-gray-500">{t.contact.wechatLabel}:</span> {contact.wechat}</div>}
                {contact.whatsapp && <div><span className="text-gray-500">{t.contact.whatsappLabel}:</span> {contact.whatsapp}</div>}
              </div>
              {company.map_lat && company.map_lng && (
                <div className="mt-4 rounded-xl overflow-hidden ring-1 ring-black/5">
                  <iframe
                    title="Factory location map"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(company.map_lng - 0.01).toFixed(6)}%2C${(company.map_lat - 0.008).toFixed(6)}%2C${(company.map_lng + 0.01).toFixed(6)}%2C${(company.map_lat + 0.008).toFixed(6)}&layer=mapnik&marker=${company.map_lat}%2C${company.map_lng}`}
                  />
                  <a href={`https://www.openstreetmap.org/?mlat=${company.map_lat}&mlon=${company.map_lng}#map=${company.map_zoom || 15}/${company.map_lat}/${company.map_lng}`} target="_blank" rel="noopener noreferrer" className="block text-xs text-center text-gray-500 hover:text-brand-700 py-1.5 bg-gray-50">在 OpenStreetMap 上打开 ↗</a>
                </div>
              )}
            </div>
            <div className="card p-6">
              <div className="text-xs uppercase tracking-wider text-brand-700">{t.contact.exportLabel}</div>
              <div className="mt-2 text-lg font-semibold">Sinopec Technologies Limited</div>
              <div className="text-sm text-gray-600">Hong Kong</div>
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-8"><InquiryForm /></div>
      </div>
    </section>
  );
}
