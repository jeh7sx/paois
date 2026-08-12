import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
  Linking,
  useWindowDimensions,
} from 'react-native';


type Tab = 'inicio' | 'papoizinha' | 'papoizinho' | 'historia' | 'quiz' | 'sobre';

// Substitua pelos caminhos reais das suas imagens
const papoizinha = require('./assets/papoizinha.jpeg');
const papoizinho = require('./assets/papoizinho.png');
const papois = require('./assets/papois.png');

// Data de início da dupla — ajuste para a data real, usada no contador da Home
const DATA_INICIO = new Date(2023, 0, 1); // ano, mês (0=jan), dia

// Linha do tempo da história dos Papois
const historia = [
  {
    emoji: '💬',
    titulo: 'O início',
    texto:
      'Tudo começou com a descoberta da palavra "papoi" — e o jeito carinhoso como ela combinava com as conversas dos dois.',
  },
  {
    emoji: '🍌',
    titulo: 'A brincadeira',
    texto:
      'Aos poucos, "papoi" deixou de ser só uma palavra engraçada e virou um apelido, uma piada interna, uma forma especial de carinho.',
  },
  {
    emoji: '❤️',
    titulo: 'A tradição',
    texto:
      'Com o tempo, os dois passaram a compartilhar o mesmo papoi. Onde existe um Papoi, certamente existe outro por perto.',
  },
  {
    emoji: '🫶',
    titulo: 'A essência',
    texto:
      'Hoje, os dois representam a verdadeira essência dos Papois: duas pessoas que transformaram uma palavra em cumplicidade e diversão.',
  },
  {
    emoji: '💛',
    titulo: 'A lenda',
    texto:
      'Dois Papois, um coração e uma única missão — continuar dizendo "papoi" um para o outro. 🍌❤️',
  },
];

// Frases marcantes da dupla
const frases = [
  { texto: 'Papoi é a palavra, carinho é a tradução.', autor: 'Papoizinha' },
  { texto: 'Onde existe um Papoi, certamente existe outro por perto.', autor: 'Papoizinho' },
  { texto: 'Uma banana, dois corações, uma piada interna que virou lar.', autor: 'Papois' },
  { texto: 'Todo dia é um novo motivo pra dizer papoi.', autor: 'Papoizinha' },
];

// Curiosidades rápidas
const curiosidades = [
  { emoji: '🍌', texto: 'A banana é o símbolo oficial da dupla desde o início da brincadeira.' },
  { emoji: '🎨', texto: 'As cores douradas e azuis representam a Papoizinha e o Papoizinho.' },
  { emoji: '📱', texto: 'Este app reúne tudo que conta a história dos Papois em um só lugar.' },
];

const quiz = [
  {
    q: 'De onde surgiu o nome "Papoi"?',
    o: ['De um jogo de tabuleiro', 'De uma palavra carinhosa entre os dois', 'De um filme'],
    a: 1,
  },
  {
    q: 'O que representa a Papoizinha no app?',
    o: ['O lado divertido e carinhoso', 'Um personagem de terror', 'Um jogo de trivia'],
    a: 0,
  },
  {
    q: 'O que representa o Papoizinho no app?',
    o: ['O lado sério e formal', 'O lado aventureiro e brincalhão', 'Um mascote de time'],
    a: 1,
  },
  {
    q: 'Juntos, Papoizinho e Papoizinha formam...',
    o: ['A dupla Papoi', 'Um trio', 'Uma banda'],
    a: 0,
  },
];

// Perguntas frequentes usadas na aba Sobre
const faq = [
  {
    p: 'O que é o app Papois?',
    r: 'É um app pessoal que reúne a história, os personagens e curiosidades da dupla Papoi, com um quiz para testar o quanto você conhece sobre eles.',
  },
  {
    p: 'Quem são Papoizinho e Papoizinha?',
    r: 'São os personagens que representam a dupla — a Papoizinha traz o lado carinhoso e divertido, e o Papoizinho o lado aventureiro e brincalhão.',
  },
  {
    p: 'Posso sugerir conteúdo novo?',
    r: 'Sim! Use o contato na seção "Fale com a gente" para enviar ideias, frases ou fotos para o app.',
  },
];

// Recursos do aplicativo, listados na aba Sobre
const recursos = [
  { emoji: '📖', texto: 'Linha do tempo com a história completa da dupla' },
  { emoji: '🧠', texto: 'Quiz interativo com pontuação' },
  { emoji: '💬', texto: 'Frases marcantes dos Papois' },
  { emoji: '✨', texto: 'Curiosidades e características de cada personagem' },
];

function diasJuntos(desde: Date) {
  const ms = Date.now() - desde.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export default function App() {
  const [tab, setTab] = useState<Tab>('inicio');
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const { width } = useWindowDimensions();
  // Altura responsiva das imagens, proporcional à largura da tela,
  // com limites mínimo e máximo para não ficar nem pequena nem exagerada.
  const heroHeight = Math.min(width * 0.65, 350);

const profileHeight = Math.min(width * 0.9, 450);

  const dias = useMemo(() => diasJuntos(DATA_INICIO), []);

  function choose(answerIndex: number) {
    const newScore = score + (answerIndex === quiz[i].a ? 1 : 0);
    if (i === quiz.length - 1) {
      setScore(newScore);
      setDone(true);
    } else {
      setScore(newScore);
      setI(i + 1);
    }
  }

  function reset() {
    setI(0);
    setScore(0);
    setDone(false);
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#12122B" />

      <View style={s.header}>
        <View style={s.headerRow}>
          <Text style={s.brandEmoji}>🍌</Text>
          <View>
            <Text style={s.title}>Papois</Text>
            <Text style={s.sub}>A dupla mais papoi que existe</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {tab === 'inicio' && (
          <>
            <View style={[s.heroWrap, { height: heroHeight }]}>
              <Image
                source={papois}
                style={s.responsiveImage}
                resizeMode="cover"
              />
            </View>

            <Text style={s.eyebrow}>BEM-VINDO</Text>
            <Text style={s.h1}>Quem são os Papois?</Text>

            <Text style={s.p}>
              Os Papois são uma dupla inseparável, nascida de uma brincadeira e
              transformada em símbolo de carinho, companheirismo e muito "papoi". 💖
            </Text>

            <View style={s.counterCard}>
              <Text style={s.counterNumber}>{dias}</Text>
              <Text style={s.counterLabel}>dias de muito papoi 🍌❤️</Text>
            </View>

            <Pressable style={s.ctaButton} onPress={() => setTab('historia')}>
              <Text style={s.ctaButtonText}>Conhecer a nossa história</Text>
              <Text style={s.ctaArrow}>→</Text>
            </Pressable>

            <View style={s.divider} />

            <Text style={s.sectionLabel}>A dupla</Text>

            <View style={s.duoRow}>
              <Pressable style={s.duoCard} onPress={() => setTab('papoizinha')}>
                <Text style={s.duoEmoji}>🍌💛</Text>
                <Text style={s.duoName}>Papoizinha</Text>
                <Text style={s.duoTag}>carinho & diversão</Text>
              </Pressable>

              <Pressable style={s.duoCard} onPress={() => setTab('papoizinho')}>
                <Text style={s.duoEmoji}>🍌💙</Text>
                <Text style={s.duoName}>Papoizinho</Text>
                <Text style={s.duoTag}>aventura & curiosidade</Text>
              </Pressable>
            </View>

            <View style={s.divider} />

            <Text style={s.sectionLabel}>Curiosidades</Text>

            {curiosidades.map((c) => (
              <View key={c.texto} style={s.fact}>
                <Text style={s.factEmoji}>{c.emoji}</Text>
                <Text style={s.factText}>{c.texto}</Text>
              </View>
            ))}
          </>
        )}

        {tab === 'papoizinha' && (
          <>
            <View style={[s.profileImageWrap, { height: profileHeight }]}>
              <Image
                source={papoizinha}
                style={s.responsiveImage}
                resizeMode="cover"
              />
            </View>

            <Text style={s.eyebrow}>PERSONAGEM</Text>
            <Text style={[s.h1, { color: '#B8860B' }]}>Papoizinha</Text>

            <View style={[s.profileCard, { backgroundColor: '#FFF6D9', borderColor: '#F3DA8B' }]}>
              <Text style={s.p}>
                A Papoizinha representa o lado divertido, carinhoso e acolhedor da
                dupla — a personagem que dá o tom afetuoso deste app.
              </Text>
            </View>

            <Text style={s.sectionLabel}>Características</Text>

            <View style={s.traitRow}>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>🍌</Text>
                <Text style={s.traitText}>Adora bananas</Text>
              </View>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>🎀</Text>
                <Text style={s.traitText}>Carinhosa</Text>
              </View>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>😄</Text>
                <Text style={s.traitText}>Brincalhona</Text>
              </View>
            </View>

            <Text style={s.sectionLabel}>Frase favorita</Text>
            <View style={s.quoteCard}>
              <Text style={s.quoteMark}>“</Text>
              <Text style={s.quoteText}>{frases[0].texto}</Text>
            </View>
          </>
        )}

        {tab === 'papoizinho' && (
          <>
            <View style={[s.profileImageWrap, { height: profileHeight }]}>
              <Image
                source={papoizinho}
                style={s.responsiveImage}
                resizeMode="cover"
              />
            </View>

            <Text style={s.eyebrow}>PERSONAGEM</Text>
            <Text style={[s.h1, { color: '#1E56A0' }]}>Papoizinho</Text>

            <View style={[s.profileCard, { backgroundColor: '#EAF4FF', borderColor: '#BFDBFE' }]}>
              <Text style={s.p}>
                O Papoizinho representa o lado aventureiro, curioso e brincalhão da
                dupla — sempre pronto para a próxima aventura.
              </Text>
            </View>

            <Text style={s.sectionLabel}>Características</Text>

            <View style={s.traitRow}>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>🍌</Text>
                <Text style={s.traitText}>Adora bananas</Text>
              </View>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>🧢</Text>
                <Text style={s.traitText}>Aventureiro</Text>
              </View>
              <View style={s.traitPill}>
                <Text style={s.traitEmoji}>🤝</Text>
                <Text style={s.traitText}>Parceiro</Text>
              </View>
            </View>

            <Text style={s.sectionLabel}>Frase favorita</Text>
            <View style={s.quoteCard}>
              <Text style={s.quoteMark}>“</Text>
              <Text style={s.quoteText}>{frases[1].texto}</Text>
            </View>

            <View style={s.fact}>
              <Text style={s.factEmoji}>💙</Text>
              <Text style={s.factText}>
                Junto com a Papoizinha, forma a dupla Papoi deste aplicativo.
              </Text>
            </View>
          </>
        )}

        {tab === 'historia' && (
          <>
            <Text style={s.eyebrow}>NOSSA JORNADA</Text>
            <Text style={s.h1}>A história dos Papois</Text>

            <View style={s.timeline}>
              {historia.map((etapa, index) => (
                <View key={etapa.titulo} style={s.timelineItem}>
                  <View style={s.timelineMarkerCol}>
                    <View style={s.timelineDot}>
                      <Text style={s.timelineDotEmoji}>{etapa.emoji}</Text>
                    </View>
                    {index < historia.length - 1 && <View style={s.timelineLine} />}
                  </View>

                  <View style={s.timelineContent}>
                    <Text style={s.timelineTitle}>{etapa.titulo}</Text>
                    <Text style={s.p}>{etapa.texto}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={s.divider} />

            <Text style={s.sectionLabel}>Frases marcantes</Text>

            {frases.map((f) => (
              <View key={f.texto} style={s.quoteCard}>
                <Text style={s.quoteMark}>“</Text>
                <Text style={s.quoteText}>{f.texto}</Text>
                <Text style={s.quoteAuthor}>— {f.autor}</Text>
              </View>
            ))}
          </>
        )}

        {tab === 'quiz' && (
          <View style={s.quizBox}>
            {!done ? (
              <>
                <View style={s.progressTrack}>
                  <View
                    style={[
                      s.progressFill,
                      { width: `${((i + 1) / quiz.length) * 100}%` },
                    ]}
                  />
                </View>

                <Text style={s.counter}>
                  PERGUNTA {i + 1} DE {quiz.length}
                </Text>

                <Text style={s.question}>{quiz[i].q}</Text>

                {quiz[i].o.map((option, optionIndex) => (
                  <Pressable
                    key={option}
                    style={s.option}
                    onPress={() => choose(optionIndex)}
                  >
                    <Text style={s.optionText}>{option}</Text>
                  </Pressable>
                ))}

                <Text style={s.points}>Pontos: {score}</Text>
              </>
            ) : (
              <View style={s.resultWrap}>
                <Text style={s.trophy}>🏆</Text>
                <Text style={s.question}>
                  Você acertou {score} de {quiz.length}!
                </Text>
                <Text style={s.p}>
                  {score === quiz.length
                    ? 'Perfeito! Você conhece muito bem a dupla Papoi. 🍌❤️'
                    : 'Legal! Que tal revisar a história dos Papois e tentar de novo?'}
                </Text>

                <Pressable style={s.button} onPress={reset}>
                  <Text style={s.buttonText}>Jogar novamente</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {tab === 'sobre' && (
          <>
            <View style={s.aboutCard}>
              <Text style={s.eyebrow}>SOBRE O PROJETO</Text>
              <Text style={s.h1}>Sobre os Papois</Text>

              <Text style={s.p}>
                Este aplicativo foi criado para celebrar a história e o universo da
                dupla Papoi — Papoizinho e Papoizinha — reunindo sua história,
                personagens, frases e um quiz divertido em um só lugar.
              </Text>
            </View>

            <Text style={s.sectionLabel}>Nossa missão</Text>
            <View style={s.aboutCard}>
              <Text style={s.p}>
                Guardar, de um jeito bonito e organizado, a história e o carinho por
                trás da palavra "papoi" — e transformar isso em uma lembrança viva
                que pode ser revisitada a qualquer momento.
              </Text>
            </View>

            <Text style={s.sectionLabel}>O que você encontra aqui</Text>
            <View style={s.aboutCard}>
              {recursos.map((r, index) => (
                <View
                  key={r.texto}
                  style={[
                    s.featureRow,
                    index === recursos.length - 1 && { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
                  ]}
                >
                  <Text style={s.featureEmoji}>{r.emoji}</Text>
                  <Text style={s.featureText}>{r.texto}</Text>
                </View>
              ))}
            </View>

            <Text style={s.sectionLabel}>Perguntas frequentes</Text>
            <View style={s.aboutCard}>
              {faq.map((item, index) => (
                <View
                  key={item.p}
                  style={[
                    s.faqItem,
                    index === faq.length - 1 && { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={s.faqQuestion}>{item.p}</Text>
                  <Text style={s.p}>{item.r}</Text>
                </View>
              ))}
            </View>

            <Text style={s.sectionLabel}>Fale com a gente</Text>
            <View style={s.aboutCard}>
              <Text style={s.p}>
                Tem uma sugestão, uma foto ou uma frase para incluir no app? Manda para
                papois@gmail.com.
              </Text>

              <Pressable
                style={s.button}
                onPress={() => Linking.openURL('mailto:papois@gmail.com?subject=Contato%20via%20Site&body=Olá,%20gostaria%20de%20entrar%20em%20contato.')}
              >
                <Text style={s.buttonText}>Enviar e-mail</Text>
              </Pressable>

              {/* <Pressable
                style={[s.button, s.buttonOutline]}
                onPress={() => Linking.openURL('https://reactnative.dev/')}
              >
                <Text style={s.buttonOutlineText}>Saiba mais sobre React Native</Text>
              </Pressable> */}
            </View>

            {/* <View style={s.aboutCard}>
              <Text style={s.sectionLabel}>Créditos</Text>
              <Text style={s.legal}>
                Projeto pessoal e independente, feito com carinho e para estudo de
                React Native.
              </Text>
              <Text style={s.legal}>Versão do app: 1.1.0</Text>
            </View> */}
          </>
        )}
      </ScrollView>

      <View style={s.nav}>
        {(
          [
            ['inicio', '🏠', 'Início'],
            ['papoizinha', '🍌💛', 'Papoizinha'],
            ['papoizinho', '🍌💙', 'Papoizinho'],
            ['historia', '📖', 'História'],
            ['quiz', '🧠', 'Quiz'],
            ['sobre', 'ℹ️', 'Sobre'],
          ] as const
        ).map(([key, emoji, label]) => (
          <Pressable
            key={key}
            style={[s.navItem, tab === key && s.active]}
            onPress={() => setTab(key)}
          >
            <Text style={s.navEmoji}>{emoji}</Text>
            <Text style={s.navLabel} numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  bg: '#FAF7F0',
  headerBg: '#12122B',
  gold: '#F5C518',
  goldDark: '#B8860B',
  blue: '#1E56A0',
  ink: '#1F1F2B',
  muted: '#5B5B6B',
  card: '#FFFFFF',
  border: '#ECE7DA',
};

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  brandEmoji: {
    fontSize: 30,
  },

  title: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  sub: {
    color: '#C9C9D6',
    fontSize: 13,
    marginTop: 2,
  },

  content: {
    padding: 20,
    paddingBottom: 32,
  },

  // Wrappers com altura responsiva (definida via useWindowDimensions no componente)
  heroWrap: {
    width: '100%',
    maxWidth: 550,
    alignSelf: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },

  profileImageWrap: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },

  // A imagem sempre preenche 100% do wrapper responsivo acima
  responsiveImage: {
    width: '100%',
    height: '100%',
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.goldDark,
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  h1: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 12,
  },

  p: {
    fontSize: 15.5,
    lineHeight: 23,
    color: COLORS.muted,
  },

  counterCard: {
    backgroundColor: COLORS.headerBg,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 18,
  },

  counterNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.gold,
  },

  counterLabel: {
    fontSize: 13,
    color: '#C9C9D6',
    marginTop: 4,
    fontWeight: '600',
  },

  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.headerBg,
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 14,
  },

  ctaButtonText: {
    color: COLORS.gold,
    fontWeight: '800',
    fontSize: 15.5,
  },

  ctaArrow: {
    color: COLORS.gold,
    fontWeight: '800',
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 26,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  duoRow: {
    flexDirection: 'row',
    gap: 14,
  },

  duoCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 22,
    alignItems: 'center',
  },

  duoEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },

  duoName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },

  duoTag: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 3,
  },

  profileCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
  },

  traitRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  traitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  traitEmoji: {
    fontSize: 15,
  },

  traitText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.ink,
  },

  fact: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
    alignItems: 'center',
    gap: 12,
  },

  factEmoji: {
    fontSize: 26,
  },

  factText: {
    flex: 1,
    lineHeight: 21,
    color: COLORS.muted,
  },

  quoteCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    padding: 18,
    marginBottom: 12,
  },

  quoteMark: {
    fontSize: 30,
    color: COLORS.gold,
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: -6,
  },

  quoteText: {
    fontSize: 15.5,
    lineHeight: 22,
    color: COLORS.ink,
    fontStyle: 'italic',
  },

  quoteAuthor: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 8,
    fontWeight: '700',
  },

  timeline: {
    marginTop: 6,
  },

  timelineItem: {
    flexDirection: 'row',
    gap: 14,
  },

  timelineMarkerCol: {
    alignItems: 'center',
    width: 44,
  },

  timelineDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timelineDotEmoji: {
    fontSize: 19,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  timelineContent: {
    flex: 1,
    paddingBottom: 26,
  },

  timelineTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 4,
    marginTop: 6,
  },

  quizBox: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 14,
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 3,
  },

  counter: {
    fontWeight: '800',
    color: COLORS.blue,
    fontSize: 12.5,
    letterSpacing: 0.5,
  },

  question: {
    fontSize: 21,
    fontWeight: '800',
    marginVertical: 16,
    color: COLORS.ink,
  },

  option: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 15.5,
    fontWeight: '600',
    color: COLORS.ink,
  },

  points: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 6,
    fontWeight: '600',
  },

  resultWrap: {
    alignItems: 'center',
  },

  trophy: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: 6,
  },

  button: {
    backgroundColor: COLORS.headerBg,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 16,
    marginTop: 18,
    alignSelf: 'stretch',
  },

  buttonText: {
    color: COLORS.gold,
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 15,
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.headerBg,
    marginTop: 12,
  },

  buttonOutlineText: {
    color: COLORS.headerBg,
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 15,
  },

  aboutCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginBottom: 18,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 14,
    marginBottom: 14,
  },

  featureEmoji: {
    fontSize: 20,
  },

  featureText: {
    flex: 1,
    fontSize: 14.5,
    color: COLORS.ink,
    fontWeight: '600',
  },

  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
    marginBottom: 16,
  },

  faqQuestion: {
    fontSize: 15.5,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 6,
  },

  legal: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999',
    marginTop: 6,
  },

  nav: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 14,
  },

  active: {
    backgroundColor: '#FFF3C4',
  },

  navEmoji: {
    fontSize: 17,
  },

  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
    color: COLORS.ink,
  },
});
