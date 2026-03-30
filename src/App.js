import React, { useState, useEffect, useMemo } from "react";

// ΠΛΗΡΗΣ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ 47 ΕΡΩΤΗΜΑΤΩΝ UNDRR (V11.0)
const essentials = [
  {
    id: 1,
    title: "Οργάνωση για την Ανθεκτικότητα",
    color: "#00897B",
    questions: [
      {
        id: "P1.1",
        title: "Σύνταξη σχεδίου",
        text: "Περιλαμβάνει το πολεοδομικό σχέδιο προσεγγίσεις ΜΚΚ σύμφωνα με το Πλαίσιο Σεντάι;",
        scale: [
          "0: Καμία ύπαρξη σχεδίων.",
          "1: Σχέδια με μερική συμμόρφωση.",
          "2: Αυτόνομο σχέδιο ΜΚΚ (10 Essentials).",
          "3: Πλήρως ενσωματωμένο σχέδιο.",
        ],
      },
      {
        id: "P1.2",
        title: "Συντονισμός",
        text: "Υπάρχει μηχανισμός πολλαπλών φορέων με εξουσία και πόρους;",
        scale: [
          "0: Στέρηση εξουσίας/πόρων.",
          "1: Εξουσία χωρίς υποστήριξη υπηρεσιών.",
          "2: Εδραιωμένες ομάδες με ασυνέπειες.",
          "3: Πλήρης εξουσία & επαρκείς πόροι.",
        ],
      },
      {
        id: "P1.3",
        title: "Ενσωμάτωση",
        text: "Είναι η ανθεκτικότητα ενσωματωμένη στις καθημερινές λειτουργίες;",
        scale: [
          "0: Δεν εφαρμόζεται.",
          "1: Ad hoc εφαρμογή.",
          "2: Γενικά χρήσιμη.",
          "3: Ρητό σημείο λήψης αποφάσεων.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Σενάρια Κινδύνου",
    color: "#0277BD",
    questions: [
      {
        id: "P2.1",
        title: "Αξιολόγηση κινδύνου",
        text: "Γνώση βασικών κινδύνων και πιθανότητας εκδήλωσης;",
        scale: [
          "0: Μη κατανοητοί.",
          "1: Δεδομένα για κύριους κινδύνους.",
          "2: Κατανόηση χωρίς πλάνο ενημέρωσης.",
          "3: Πλήρης κατανόηση & τακτική ενημέρωση.",
        ],
      },
      {
        id: "P2.2",
        title: "Κίνδυνος υποδομών",
        text: "Κοινή κατανόηση κινδύνων με παρόχους κοινής ωφέλειας;",
        scale: [
          "0: Σημαντικά κενά.",
          "1: Γνωστά μεμονωμένα, χωρίς ανταλλαγή.",
          "2: Κάποια ανταλλαγή & συναίνεση.",
          "3: Πλήρης αναγνώριση αλληλεξαρτήσεων.",
        ],
      },
      {
        id: "P2.3",
        title: "Έκθεση & Τρωτότητα",
        text: "Συμφωνημένα σενάρια έκθεσης και τρωτότητας;",
        scale: [
          "0: Δεν διατίθενται.",
          "1: Ορισμένες πληροφορίες.",
          "2: Ολοκληρωμένη σειρά σεναρίων.",
          "3: Πλήρη & επικαιροποιημένα σενάρια.",
        ],
      },
      {
        id: "P2.4",
        title: "Διαδοχικές επιπτώσεις",
        text: "Κατανόηση αλυσιδωτών αστοχιών (cascading);",
        scale: [
          "0: Καμία κατανόηση.",
          "1: Κάποια κατανόηση.",
          "2: Σχετικά πλήρης (ορισμένα σενάρια).",
          "3: Πλήρης κατανόηση (πολλά σενάρια).",
        ],
      },
      {
        id: "P2.5",
        title: "Χάρτες κινδύνου",
        text: "Σαφείς χάρτες επικινδυνότητας με τακτική ενημέρωση;",
        scale: [
          "0: Δεν υπάρχουν.",
          "1: Για ορισμένους κινδύνους.",
          "2: Για τους περισσότερους.",
          "3: Υψηλή ποιότητα & τακτική ενημέρωση.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Οικονομική Ικανότητα",
    color: "#1565C0",
    questions: [
      {
        id: "P3.1",
        title: "Επενδύσεις",
        text: "Κατανόηση πηγών χρηματοδότησης;",
        scale: [
          "0: Μικρή κατανόηση.",
          "1: Ελλιπής εικόνα.",
          "2: Ενεργή επιδίωξη.",
          "3: Πλήρης επιτυχία.",
        ],
      },
      {
        id: "P3.2",
        title: "Προϋπολογισμός",
        text: "Δεσμευμένος προϋπολογισμός (ring-fenced) για το DRR;",
        scale: [
          "0: Κανένα σχέδιο.",
          "1: Μη συντονισμένα πλάνα.",
          "2: Δεσμευμένοι προϋπολογισμοί.",
          "3: Ολοκληρωμένο οικονομικό σχέδιο.",
        ],
      },
      {
        id: "P3.3",
        title: "Ασφάλιση",
        text: "Επίπεδο ασφαλιστικής κάλυψης στην πόλη;",
        scale: [
          "0: Μικρή ή καθόλου.",
          "1: Χωρίς προώθηση.",
          "2: Ενεργή προώθηση.",
          "3: Υψηλή υιοθέτηση.",
        ],
      },
      {
        id: "P3.4",
        title: "Κίνητρα",
        text: "Κίνητρα για την υποστήριξη της ανθεκτικότητας;",
        scale: [
          "0: Ελάχιστα.",
          "1: Αποσπασματικά.",
          "2: Σειρά κινήτρων (με κενά).",
          "3: Πλήρης κάλυψη αναγκών.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Αστική Ανάπτυξη",
    color: "#2E7D32",
    questions: [
      {
        id: "P4.1",
        title: "Χρήσεις γης",
        text: "Κατάλληλη ζωνοποίηση βάσει σεναρίων κινδύνου;",
        scale: [
          "0: Καμία γνωστή.",
          "1: Ελλιπής.",
          "2: Σύνδεση με χάρτες κινδύνου.",
          "3: Πλήρης σύνδεση.",
        ],
      },
      {
        id: "P4.2",
        title: "Νέα έργα",
        text: "Προώθηση ανθεκτικότητας στο σχεδιασμό νέων έργων;",
        scale: [
          "0: Καμία προώθηση.",
          "1: Μη συνεπής.",
          "2: Πολιτική χωρίς οδηγίες.",
          "3: Σαφής πολιτική.",
        ],
      },
      {
        id: "P4.3",
        title: "Κανονισμοί",
        text: "Οικοδομικοί κανονισμοί που αντιμετωπίζουν κινδύνους;",
        scale: [
          "0: Καμία χρήση.",
          "1: Κάλυψη ορισμένων.",
          "2: Τοπικοί κώδικες κύριων κινδύνων.",
          "3: Κάλυψη όλων των κινδύνων.",
        ],
      },
      {
        id: "P4.4",
        title: "Εφαρμογή",
        text: "Επιβολή και επαλήθευση κανόνων ζωνοποίησης;",
        scale: [
          "0: Καμία εστίαση.",
          "1: Μερική/Ασυνεπής.",
          "2: Επαλήθευση >50%.",
          "3: Επαλήθευση 100%.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Φυσικά Αναχώματα",
    color: "#558B2F",
    questions: [
      {
        id: "P5.1",
        title: "Οικοσυστήματα",
        text: "Κατανόηση λειτουργιών φυσικού κεφαλαίου;",
        scale: [
          "0: Καμία επίγνωση.",
          "1: Ελλιπής κατανόηση.",
          "2: Κατανόηση χωρίς αποτίμηση.",
          "3: Πλήρης κατανόηση και αποτίμηση.",
        ],
      },
      {
        id: "P5.2",
        title: "Πράσινες υποδομές",
        text: "Προώθηση πράσινων/γαλάζιων υποδομών;",
        scale: [
          "0: Καμία ώθηση.",
          "1: Χωρίς πολιτική.",
          "2: Πολιτική χωρίς οδηγίες.",
          "3: Πολιτική και οδηγοί.",
        ],
      },
      {
        id: "P5.3",
        title: "Διασυνοριακά",
        text: "Επίγνωση υπηρεσιών πέρα από τα όρια της πόλης;",
        scale: [
          "0: Καμία επίγνωση.",
          "1: Επίγνωση χωρίς δράση.",
          "2: Αρχικές συζητήσεις.",
          "3: Σχέδια & συμφωνίες.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Θεσμική Ικανότητα",
    color: "#6A1B9A",
    questions: [
      {
        id: "P6.1",
        title: "Δεξιότητες",
        text: "Πρόσβαση σε δεξιότητες που απαιτούνται;",
        scale: [
          "0: Σημαντικά κενά.",
          "1: Πρόσβαση με κενά.",
          "2: Γρήγορη πρόσβαση.",
          "3: Πλήρης επάρκεια.",
        ],
      },
      {
        id: "P6.2",
        title: "Ευαισθητοποίηση",
        text: "Εκπαιδευτική εκστρατεία πληροφοριών κινδύνου;",
        scale: [
          "0: Ανεπαρκή.",
          "1: 25% πληθυσμού.",
          "2: >50% πληθυσμού.",
          "3: >75% πληθυσμού.",
        ],
      },
      {
        id: "P6.3",
        title: "Διαμοιρασμός",
        text: "Κοινή χρήση δεδομένων μεταξύ φορέων;",
        scale: [
          "0: Καθόλου.",
          "1: Ακατέργαστα.",
          "2: Σύνθεση.",
          "3: Ανοιχτή πύλη.",
        ],
      },
      {
        id: "P6.4",
        title: "Κατάρτιση",
        text: "Σεμινάρια κινδύνου σε όλους τους τομείς;",
        scale: [
          "0: Ελάχιστη.",
          "1: Ορισμένες ενότητες.",
          "2: Σε κάποιους τομείς.",
          "3: Σε όλους τους τομείς.",
        ],
      },
      {
        id: "P6.5",
        title: "Γλώσσες",
        text: "Υλικό διαθέσιμο στις γλώσσες της πόλης;",
        scale: [
          "0: Καμία μετάφραση.",
          "1: Ορισμένες γλώσσες.",
          "2: Περισσότερες.",
          "3: Όλες οι γλώσσες.",
        ],
      },
      {
        id: "P6.6",
        title: "Μάθηση",
        text: "Ανταλλαγή γνώσεων με άλλες πόλεις;",
        scale: [
          "0: Βασίζεται σε άτομα.",
          "1: Ad-hoc.",
          "2: Συμμετοχή σε δίκτυα.",
          "3: Προληπτική συμμετοχή.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Κοινωνική Ικανότητα",
    color: "#AD1457",
    questions: [
      {
        id: "P7.1",
        title: "Οργανώσεις βάσης",
        text: "Συμμετοχή τοπικών οργανώσεων στον σχεδιασμό;",
        scale: [
          "0: Μικρή συμμετοχή.",
          "1: Επίγνωση χωρίς δράση.",
          "2: Μερική συμμετοχή.",
          "3: Ενεργή συμμετοχή.",
        ],
      },
      {
        id: "P7.2",
        title: "Ευάλωτοι",
        text: "Εκπαίδευση στους κοινωνικά ευάλωτους;",
        scale: [
          "0: Χωρίς χαρτογράφηση.",
          "1: Χωρίς εκπαίδευση.",
          "2: Ετήσια.",
          "3: Εξαμηνιαία.",
        ],
      },
      {
        id: "P7.3",
        title: "Ιδιωτικός τομέας",
        text: "Ποσοστό επιχειρήσεων με σχέδιο BCP;",
        scale: ["0: <20%.", "1: 20-40%.", "2: 40-60%.", "3: 60-100%."],
      },
      {
        id: "P7.4",
        title: "Συμμετοχή πολιτών",
        text: "Επικοινωνία με πολίτες για το DRR;",
        scale: [
          "0: Κακή.",
          "1: Ημι-τακτική.",
          "2: Πολλαπλά κανάλια.",
          "3: Αμφίδρομη ροή.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Ανθεκτικότητα Υποδομών",
    color: "#E65100",
    questions: [
      {
        id: "P8.1",
        title: "Στρατηγική",
        text: "Προτεραιότητα ανθεκτικότητας κρίσιμων υποδομών;",
        scale: [
          "0: Καμία κατανόηση.",
          "1: Ορισμένοι τύποι.",
          "2: Κοινή κατανόηση.",
          "3: Εφαρμογή στρατηγικής.",
        ],
      },
      {
        id: "P8.2",
        title: "Προστασία",
        text: "Σχεδιασμός προστατευτικών υποδομών;",
        scale: [
          "0: Απροστάτευτα τμήματα.",
          "1: Λείπουν στρατηγικές.",
          "2: Βέλτιστες πρακτικές.",
          "3: Πλήρης συμμόρφωση.",
        ],
      },
      {
        id: "P8.3",
        title: "Νερό",
        text: "Απώλεια υπηρεσιών στο «πιθανό» σενάριο;",
        scale: [
          "0: Σημαντική.",
          "1: Κάποια.",
          "2: Κάποια (σοβαρό).",
          "3: Καμία (σοβαρό).",
        ],
      },
      {
        id: "P8.4",
        title: "Ενέργεια",
        text: "Διακοπή στη «χειρότερη περίπτωση»;",
        scale: [
          "0: Σημαντική.",
          "1: Κάποια.",
          "2: Κάποια (σοβαρό).",
          "3: Καμία (σοβαρό).",
        ],
      },
      {
        id: "P8.5",
        title: "Μεταφορές",
        text: "Διακοπή στη «χειρότερη περίπτωση»;",
        scale: [
          "0: Σημαντική.",
          "1: Κάποια.",
          "2: Κάποια (σοβαρό).",
          "3: Καμία (σοβαρό).",
        ],
      },
      {
        id: "P8.6",
        title: "Επικοινωνίες",
        text: "Διακοπή στη «χειρότερη περίπτωση»;",
        scale: [
          "0: Σημαντική.",
          "1: Κάποια.",
          "2: Κάποια (σοβαρό).",
          "3: Καμία (σοβαρό).",
        ],
      },
      {
        id: "P8.7",
        title: "Υγεία",
        text: "Δυνατότητες επείγουσας περίθαλψης;",
        scale: [
          "0: >36 ώρες.",
          "1: Εντός 36 ωρών.",
          "2: Εντός 24 ωρών.",
          "3: Εντός 6 ωρών.",
        ],
      },
      {
        id: "P8.8",
        title: "Εκπαίδευση",
        text: "% δομών σε κίνδυνο ζημιάς;",
        scale: [
          "0: >15%.",
          "1: 5-10%.",
          "2: Καμία (πιθανό).",
          "3: Καμία (σοβαρό).",
        ],
      },
      {
        id: "P8.9",
        title: "Ανταποκριτές",
        text: "Επάρκεια εξοπλισμού για το σοβαρό σενάριο;",
        scale: [
          "0: Σημαντικά κενά.",
          "1: Κάλυψη βασικών αναγκών.",
          "2: Επαρκή (συνδρομή).",
          "3: Αποδεδειγμένη επάρκεια.",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Αποτελεσματική Απόκριση",
    color: "#BF360C",
    questions: [
      {
        id: "P9.1",
        title: "Προειδοποίηση",
        text: "SOP και ποσοστό πρόσβασης πληθυσμού;",
        scale: ["0: <50%.", "1: >50%.", "2: >75%.", "3: >90%."],
      },
      {
        id: "P9.2",
        title: "Σχέδια διαχείρισης",
        text: "Σχέδιο που καθορίζει ρόλους και πόρους;",
        scale: [
          "0: Κανένα.",
          "1: Μη συνδεδεμένα.",
          "2: Με κενά.",
          "3: Πλήρες σχέδιο.",
        ],
      },
      {
        id: "P9.3",
        title: "Στελέχωση",
        text: "Surge capacity ανταποκριτών;",
        scale: [
          "0: Μη προσδιορισμένη.",
          "1: 48-72 ώρες.",
          "2: 24-48 ώρες.",
          "3: <4 ώρες.",
        ],
      },
      {
        id: "P9.4",
        title: "Εξοπλισμός",
        text: "Καθορισμός αναγκών και διαθεσιμότητας;",
        scale: [
          "0: Μη καθορισμένα.",
          "1: Τυπικός καθορισμός.",
          "2: Σύνδεση με σενάρια.",
          "3: Καθορισμός & εθελοντές.",
        ],
      },
      {
        id: "P9.5",
        title: "Αγαθά",
        text: "Σίτιση και στέγαση μετά το συμβάν;",
        scale: [
          "0: Έλλειψη >5%.",
          "1: Έλλειψη >2%.",
          "2: Ίση με την ανάγκη.",
          "3: Υπερβαίνει την ανάγκη.",
        ],
      },
      {
        id: "P9.6",
        title: "ΚΕΠΙΧ",
        text: "Κέντρο επιχειρήσεων με όλες τις υπηρεσίες;",
        scale: [
          "0: Δεν υπάρχει.",
          "1: Ευάλωτο.",
          "2: Βασικές.",
          "3: Πλήρης συμμετοχή.",
        ],
      },
      {
        id: "P9.7",
        title: "Ασκήσεις",
        text: "Ασκήσεις κοινού και επαγγελματιών;",
        scale: ["0: Καμία.", "1: Ad hoc.", "2: Ετήσιες.", "3: Ρεαλιστικές."],
      },
    ],
  },
  {
    id: 10,
    title: "Ανάκαμψη & BBB",
    color: "#4A148C",
    questions: [
      {
        id: "P10.1",
        title: "Στρατηγική",
        text: "Στρατηγική ανάκαμψης πριν από το συμβάν;",
        scale: [
          "0: Καμία.",
          "1: Μη συνδεδεμένα.",
          "2: Με αδυναμίες.",
          "3: Στιβαρή.",
        ],
      },
      {
        id: "P10.2",
        title: "Διδάγματα",
        text: "Διαδικασία άντλησης διδαγμάτων;",
        scale: [
          "0: Ad-hoc.",
          "1: Όχι συστηματική.",
          "2: Με κενά.",
          "3: Σαφείς διαδικασίες.",
        ],
      },
    ],
  },
];

export default function App() {
  const [scores, setScores] = useState(() =>
    JSON.parse(localStorage.getItem("v11_scores") || "{}")
  );
  const [actions, setActions] = useState(() =>
    JSON.parse(localStorage.getItem("v11_actions") || "{}")
  );
  const [photos, setPhotos] = useState(() =>
    JSON.parse(localStorage.getItem("v11_photos") || "{}")
  );
  const [city, setCity] = useState(localStorage.getItem("v11_city") || "");

  useEffect(() => {
    localStorage.setItem("v11_scores", JSON.stringify(scores));
    localStorage.setItem("v11_actions", JSON.stringify(actions));
    localStorage.setItem("v11_photos", JSON.stringify(photos));
    localStorage.setItem("v11_city", city);
  }, [scores, actions, photos, city]);

  const analytics = useMemo(() => {
    const report = essentials.map((e) => {
      const qs = e.questions
        .map((q) => scores[q.id])
        .filter((v) => v !== undefined);
      const score = qs.reduce((a, b) => a + b, 0);
      const perc = qs.length > 0 ? (score / (e.questions.length * 3)) * 100 : 0;
      return { ...e, perc, answered: qs.length };
    });
    const totalAns = Object.keys(scores).length;
    const totalPerc =
      totalAns > 0
        ? (Object.values(scores).reduce((a, b) => a + b, 0) / (totalAns * 3)) *
          100
        : 0;
    const histogram = { 0: 0, 1: 0, 2: 0, 3: 0 };
    Object.values(scores).forEach((v) => histogram[v]++);
    const priorities = [...report]
      .sort((a, b) => a.perc - b.perc)
      .filter((e) => e.answered > 0);
    return { report, totalPerc, totalAns, histogram, priorities };
  }, [scores]);

  const handlePhoto = (qid, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setPhotos((prev) => ({ ...prev, [qid]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "system-ui",
      }}
    >
      <header
        className="no-print"
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "18px", color: "#2dd4bf" }}>
            UNDRR COMMAND DSS V11.0
          </h1>
          <button
            onClick={() => window.confirm("Reset?") && localStorage.clear()}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "10px",
            }}
          >
            RESET
          </button>
        </div>
        <input
          placeholder="Πόλη / Υπηρεσία..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />
      </header>

      {/* DASHBOARD ANALYTICS */}
      <section
        className="no-print"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "12px" }}>
            RESILIENCE BY ESSENTIAL (%)
          </h4>
          {analytics.report.map((e) => (
            <div key={e.id} style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                }}
              >
                <span>
                  E{e.id}: {e.title}
                </span>
                <strong>{e.perc.toFixed(0)}%</strong>
              </div>
              <div
                style={{
                  height: "6px",
                  background: "#f1f5f9",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${e.perc}%`,
                    background: e.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <h4 style={{ margin: "0 0 15px 0", fontSize: "12px" }}>
            OVERALL SCORE & HISTOGRAM
          </h4>
          <div
            style={{ fontSize: "38px", fontWeight: "bold", color: "#0f172a" }}
          >
            {analytics.totalPerc.toFixed(1)}%
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-end",
              height: "60px",
              marginTop: "15px",
            }}
          >
            {[0, 1, 2, 3].map((v) => (
              <div key={v} style={{ width: "30px" }}>
                <div
                  style={{
                    background: "#94a3b8",
                    height: `${analytics.histogram[v] * 10}px`,
                    borderRadius: "3px 3px 0 0",
                    minHeight: "2px",
                  }}
                />
                <div style={{ fontSize: "9px" }}>S{v}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "20px",
              background: "#fef2f2",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #fee2e2",
            }}
          >
            <h5
              style={{
                margin: "0 0 5px 0",
                fontSize: "10px",
                color: "#991b1b",
              }}
            >
              TOP PRIORITIES (LOWEST SCORES)
            </h5>
            {analytics.priorities.slice(0, 3).map((p) => (
              <div key={p.id} style={{ fontSize: "11px", color: "#b91c1c" }}>
                ⚠️ E{p.id}: {p.perc.toFixed(0)}% Ανθεκτικότητα
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE */}
      <main className="no-print">
        {essentials.map((e) => (
          <details
            key={e.id}
            style={{
              marginBottom: "12px",
              background: "#fff",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <summary
              style={{
                padding: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                background: "#f8fafc",
                color: e.color,
              }}
            >
              {e.id}. {e.title.toUpperCase()}
            </summary>
            <div style={{ padding: "15px" }}>
              {e.questions.map((q) => {
                const isCritical =
                  scores[q.id] !== undefined && scores[q.id] < 2;
                return (
                  <div
                    key={q.id}
                    style={{
                      marginBottom: "30px",
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: "20px",
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {q.id} {q.title}
                    </div>
                    <p style={{ fontSize: "12px", color: "#64748b" }}>
                      {q.text}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        margin: "15px 0",
                      }}
                    >
                      {q.scale.map((desc, v) => (
                        <button
                          key={v}
                          onClick={() => setScores({ ...scores, [q.id]: v })}
                          style={{
                            textAlign: "left",
                            padding: "12px",
                            borderRadius: "8px",
                            border:
                              scores[q.id] === v
                                ? `2px solid ${e.color}`
                                : "1px solid #e2e8f0",
                            background: scores[q.id] === v ? e.color : "#fff",
                            color: scores[q.id] === v ? "#fff" : "#475569",
                            fontSize: "11px",
                            cursor: "pointer",
                          }}
                        >
                          {desc}
                        </button>
                      ))}
                    </div>
                    {isCritical && (
                      <div
                        style={{
                          background: "#fff1f2",
                          padding: "15px",
                          borderRadius: "8px",
                          border: "1px solid #fda4af",
                        }}
                      >
                        <div
                          style={{
                            color: "#be123c",
                            fontWeight: "bold",
                            fontSize: "10px",
                          }}
                        >
                          ⚠️ ACTION PLAN & COST ESTIMATION REQUIRED
                        </div>
                        <textarea
                          placeholder="Ενέργειες βελτίωσης..."
                          value={actions[q.id] || ""}
                          onChange={(e) =>
                            setActions({ ...actions, [q.id]: e.target.value })
                          }
                          style={{
                            width: "100%",
                            marginTop: "8px",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #fda4af",
                            fontSize: "12px",
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        id={`cam-${q.id}`}
                        style={{ display: "none" }}
                        onChange={(e) => handlePhoto(q.id, e)}
                      />
                      <label
                        htmlFor={`cam-${q.id}`}
                        style={{
                          background: "#f1f5f9",
                          padding: "12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border: "1px solid #cbd5e1",
                        }}
                      >
                        📸
                      </label>
                      {photos[q.id] && (
                        <img
                          src={photos[q.id]}
                          style={{ width: "80px", borderRadius: "4px" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        ))}
      </main>

      <footer className="no-print">
        <button
          onClick={() => window.print()}
          style={{
            width: "100%",
            padding: "18px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ΕΞΑΓΩΓΗ ΤΕΧΝΙΚΗΣ ΕΚΘΕΣΗΣ (PDF)
        </button>
      </footer>

      {/* PRINT LAYOUT */}
      <div className="print-only" style={{ display: "none" }}>
        <h1 style={{ textAlign: "center" }}>UNDRR RESILIENCE REPORT: {city}</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Score: {analytics.totalPerc.toFixed(1)}%</span>
          <span>Date: {new Date().toLocaleDateString("el-GR")}</span>
        </div>
        <hr />
        {essentials.map((e) => (
          <div key={e.id} style={{ pageBreakInside: "avoid" }}>
            <h2 style={{ background: "#eee", padding: "10px" }}>
              {e.id}. {e.title} (
              {analytics.report.find((r) => r.id === e.id).perc.toFixed(0)}%)
            </h2>
            {e.questions
              .filter((q) => scores[q.id] !== undefined)
              .map((q) => (
                <div
                  key={q.id}
                  style={{
                    marginBottom: "15px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <h4>
                    {q.id} {q.title} - Score: {scores[q.id]}/3
                  </h4>
                  {actions[q.id] && (
                    <p>
                      <strong>Action Plan:</strong> {actions[q.id]}
                    </p>
                  )}
                  {photos[q.id] && (
                    <img src={photos[q.id]} style={{ width: "250px" }} />
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
      <style>{`@media print {.no-print {display:none;} .print-only {display:block; font-size: 11px;}}`}</style>
    </div>
  );
}
