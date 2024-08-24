import SalaryChart from '@/components/chart/page';
import { PersonalInfo } from '@/components/data-table/columns';
import { getUserAuth } from '@/lib/auth/utils';


async function getPersonalInfoData() {
  const { session } = await getUserAuth();
  
  if (session?.user?.id) {
    const response = await fetch(`${process.env.BASE_URL}/api/personal-info?userId=${session?.user.id}`, {
      method: "GET",
    });
 
    if (!response.ok) {
      throw new Error('Failed to fetch personal info');
    }
    
    const data = await response.json();
    return data;
  }
  
  return [];
}

export default async function SalaryReport() {
  const data = await getPersonalInfoData();

  if (!data.length) {
    return <div>No data available</div>;
  }

  const sortedData = data.sort((a: PersonalInfo, b: PersonalInfo) => b.salario - a.salario);

  const totalSalaries = data.reduce((sum: number, user: PersonalInfo) => sum + user.salario, 0);
  const averageSalary = totalSalaries / data.length;
  const medianSalary =
    sortedData.length % 2 === 0
      ? (sortedData[sortedData.length / 2 - 1].salario +
          sortedData[sortedData.length / 2].salario) /
        2
      : sortedData[Math.floor(sortedData.length / 2)].salario;

  const labels = sortedData.map((user: PersonalInfo) => user.name);
  const salaries = sortedData.map((user: PersonalInfo) => user.salario);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reporte de Salarios</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Estadísticas</h3>
        <p>Total de usuarios: {data.length}</p>
        <p>Salario promedio: ${averageSalary.toFixed(2)}</p>
        <p>Salario medio: ${medianSalary.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Usuarios con mejores salarios</h3>
        <ul className="list-disc pl-5">
          {sortedData.map((user: PersonalInfo, index: number) => (
            <li key={index}>
              {user.name} - ${user.salario.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Tendencia de Salarios</h3>
        <SalaryChart labels={labels} salaries={salaries} />
      </div>
    </div>
  );
}
