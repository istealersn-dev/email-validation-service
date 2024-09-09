import { NextResponse } from "next/server";
import dns from 'dns/promises'

/**
 * Handles the POST request to the /api/lookup endpoint.
 * Extracts the email address from the request body and resolves
 * the MX records for the domain.
 * Returns the MX records and IP addresses for the domain.
 * @param {Request} request The request object.
 * @returns {Promise<NextResponse>} A promise resolved with the response object.
 */
export async function POST(request: Request): Promise<NextResponse> {

  try {
    // Extract the email from the request body
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )}

      const domain = email.split('@').pop();

      if (!domain) {
        return NextResponse.json(
          { success: false, message: "Email is invalid" },
          { status: 400 }
        )
      }

      try {
        // Fetch MX records for the domain
        const mxRecords = await dns.resolveMx(domain);
  
        if (mxRecords.length === 0) {
          return NextResponse.json({
            success: false,
            message: `No MX records found for domain: ${domain}`,
          });
        }
  
        // Resolve MX record hostnames to IP addresses
        const mxRecordsWithIPs = await Promise.all(
          mxRecords.map(async (mx) => {
            try {
              // Resolve the IP addresses for the MX record hostname
              const ips = await dns.resolve4(mx.exchange);
              return { exchange: mx.exchange, ips };
            } catch (err) {
              // Handle the case where MX record hostname cannot be resolved to IP
              return { exchange: mx.exchange, ips: [] };
            }
          })
        );
  
        return NextResponse.json({
          success: true,
          domain,
          mxRecordsWithIPs,
          message: `MX records and IP addresses resolved for domain: ${domain}`,
        });
      } catch (err) {
        return NextResponse.json(
          { success: false, message: `Error fetching MX records` },
          { status: 500 }
        );
      }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid email' }, 
      { status: 500 }
    )}
}

