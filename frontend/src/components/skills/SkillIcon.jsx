import { 
  Laptop, Music, Palette, Languages, Dumbbell, Hammer, 
  HelpCircle, Code, Database, Shield, Smartphone, 
  PenTool, Mic, Camera, Video, MessageCircle, 
  Scissors, ChefHat, Wrench, Briefcase, Calculator
} from 'lucide-react';

const ICON_MAP = {
  // Categories
  'Tecnología': Laptop,
  'Música': Music,
  'Arte y Diseño': Palette,
  'Idiomas': Languages,
  'Deportes': Dumbbell,
  'Oficios': Hammer,
  'Otros': HelpCircle,

  // Specific Skills
  'Frontend': Code,
  'Backend': Database,
  'Data Science': Database,
  'Ciberseguridad': Shield,
  'Mobile': Smartphone,
  'UI/UX': PenTool,
  'Piano': Music,
  'Guitarra': Music,
  'Canto': Mic,
  'Fotografía': Camera,
  'Edición de Video': Video,
  'Inglés': MessageCircle,
  'Español': MessageCircle,
  'Carpintería': Hammer,
  'Peluquería': Scissors,
  'Cocina': ChefHat,
  'Electricidad': Wrench,
  'Finanzas Personales': Calculator,
  'Marketing': Briefcase
};

export function getIconForSkill(nameOrCategory) {
  return ICON_MAP[nameOrCategory] || HelpCircle;
}

export function SkillIcon({ name, category, size = 20, className = '' }) {
  // Primero intentamos hacer match por el nombre de la habilidad, si no, por la categoría.
  const IconComponent = ICON_MAP[name] || ICON_MAP[category] || HelpCircle;
  return <IconComponent size={size} className={className} />;
}

export default SkillIcon;
