import QuizActivity from "./QuizActivity";
import SortActivity from "./SortActivity";
import MatchActivity from "./MatchActivity";
import CipherActivity from "./CipherActivity";
import MiningActivity from "./MiningActivity";
import TrueFalseActivity from "./TrueFalseActivity";
import CategorizeActivity from "./CategorizeActivity";
import ScrambleActivity from "./ScrambleActivity";

export default function ActivityView({ activity, color, onComplete }) {
  const props = { activity, color, onComplete };
  switch (activity.type) {
    case "quiz":       return <QuizActivity {...props} />;
    case "sort":       return <SortActivity {...props} />;
    case "match":      return <MatchActivity {...props} />;
    case "cipher":     return <CipherActivity {...props} />;
    case "mining":     return <MiningActivity {...props} />;
    case "truefalse":  return <TrueFalseActivity {...props} />;
    case "categorize": return <CategorizeActivity {...props} />;
    case "scramble":   return <ScrambleActivity {...props} />;
    default:           return <p>Onbekende activiteit</p>;
  }
}
