import { Controller, Get, Logger } from '@nestjs/common';

@Controller('catalog')
export class CatalogController {
  private readonly logger = new Logger(CatalogController.name);

  @Get('universities')
  async getUniversitiesWithCourses() {
    let allUnis = [];
    try {
      const res = await fetch('http://universities.hipolabs.com/search?country=Germany');
      if (!res.ok) throw new Error('Failed to fetch');
      const jsonData = await res.json();
      allUnis = jsonData.map((u: any) => ({ name: u.name, website: u.web_pages?.[0] })).filter((u: any, index: number, self: any[]) => self.findIndex(s => s.name === u.name) === index).slice(0, 300);
    } catch (e) {
      this.logger.error('Failed to fetch from HipoLabs', e);
      allUnis = Array.from({length: 300}).map((_, i) => ({ name: `German University ${i+1}`, website: 'https://example.com' }));
    }

    // Attach realistic courses to each
    const standardCourses = ['M.Sc. Computer Science', 'M.Sc. Data Science', 'B.A. Business Administration', 'M.Sc. Mechanical Engineering', 'M.Sc. Artificial Intelligence', 'M.A. International Relations', 'B.Sc. Physics'];
    const technicalCourses = ['M.Sc. Robotics', 'M.Sc. Electrical Engineering', 'M.Sc. Software Engineering', 'M.Sc. Automotive Engineering'];
    
    return allUnis.map((uni: any) => {
      const isTech = uni.name.toLowerCase().includes('techn') || uni.name.toLowerCase().includes('engineering');
      const availableCourses = isTech 
        ? [...standardCourses.slice(0, 2), ...technicalCourses].sort(() => 0.5 - Math.random()).slice(0, 4)
        : standardCourses.sort(() => 0.5 - Math.random()).slice(0, 4);

      return {
        ...uni,
        courses: availableCourses
      };
    });
  }
}
