interface MXRecordItem {
    host: string;
    ips: string[];
  }

interface ResultsProps {
    mxResult: {
      success?: boolean;
      domain?: string;
      mxRecordsWithIPs?: MXRecordItem[];
      message?: string;
    };
  }

  export const Results = ({ mxResult }: ResultsProps) => {
  return (
    <div>
      {mxResult.success ? (
        <div>
          <p>Email domain: {mxResult.domain}</p>
          <h3>MX Records:</h3>
          <ul>
            {mxResult.mxRecordsWithIPs?.map((record, index) => (
              <li key={index}>
                Host: {record.host}
                <ul>
                  {record.ips.map((ip, ipIndex) => (
                    <li key={ipIndex}>IP: {ip}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{mxResult.message}</p>
      )}
    </div>
  );
  }