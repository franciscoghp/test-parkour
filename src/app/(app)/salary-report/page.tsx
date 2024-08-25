'use client';

import { useState, useEffect } from 'react';
import SalaryChart from '@/components/chart/page';
import { PersonalInfo } from '@/components/data-table/columns';
import TranslateText from '@/components/translateText/page';
import { useSession } from 'next-auth/react';

export default function SalaryReport() {
  const { data: session } = useSession();
  const [data, setData] = useState<PersonalInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      const loadPersonalInfoData = async () => {
        try {
          const apiUrl = `/api/personal-info?userId=${session.user.id}`;

          const response = await fetch(apiUrl, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error('Failed to fetch personal info');
          }

          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching personal info:", error);
        } finally {
          setLoading(false);
        }
      };

      loadPersonalInfoData();
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <div><TranslateText id={'loading'} /></div>;
  }

  if (!data.length) {
    return <div><TranslateText id={'noDataAvailable'} /></div>;
  }

  const sortedData = data.sort((a, b) => b.salario - a.salario);

  const totalSalaries = data.reduce((sum, user) => sum + user.salario, 0);
  const averageSalary = totalSalaries / data.length;
  const medianSalary =
    sortedData.length % 2 === 0
      ? (sortedData[sortedData.length / 2 - 1].salario +
          sortedData[sortedData.length / 2].salario) /
        2
      : sortedData[Math.floor(sortedData.length / 2)].salario;

  const labels = sortedData.map((user) => user.name);
  const salaries = sortedData.map((user) => user.salario);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4"><TranslateText id={'salaryReport'} /></h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium"><TranslateText id={'statistics'} /></h3>
        <p><TranslateText id={'totalUsers'} /> {data.length}</p>
        <p><TranslateText id={'averageSalary'} /> ${averageSalary.toFixed(2)}</p>
        <p><TranslateText id={'medianSalary'} /> ${medianSalary.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2"><TranslateText id={'topSalaries'} /></h3>
        <ul className="list-disc pl-5">
          {sortedData.map((user, index) => (
            <li key={index}>
              {user.name} - ${user.salario.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4"><TranslateText id={'salaryTrend'} /></h3>
        <SalaryChart labels={labels} salaries={salaries} />
      </div>
    </div>
  );
}
