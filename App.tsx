import { StatusBar } from 'expo-status-bar';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    type ColorValue,
    Image,
    type ImageProps,
    type ImageSourcePropType,
    type ImageStyle,
    KeyboardAvoidingView,
    type KeyboardTypeOptions,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    type StyleProp,
    StyleSheet,
    Text,
    TextInput,
    type TextInputProps,
    type TextStyle,
    useWindowDimensions,
    View,
    type ViewStyle,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import data, { type PackageId } from './appData';

const { colors: C, images, packages, calculateFees, formatMoney } = data;
const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });

type ScreenName = 'home' | 'about' | 'adventures' | 'advice' | 'booking' | 'contacts' | PackageId;
type RouteName = ScreenName | 'splash';
type RouteEntry = { name: RouteName; key: number; packageId?: PackageId };
type Navigate = (name: ScreenName, params?: { packageId?: PackageId }) => void;
type ScreenProps = { route: RouteEntry; navigate: Navigate; packageId?: PackageId };
type ButtonProps = { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean; style?: StyleProp<ViewStyle> };
type PhotoProps = { source: ImageSourcePropType | null | undefined; label: string; style?: StyleProp<ImageStyle>; resizeMode?: ImageProps['resizeMode'] };
type HeadingProps = { children: ReactNode; small?: boolean; style?: StyleProp<TextStyle> };
type PanelProps = { title?: string; children: ReactNode; color?: ColorValue; style?: StyleProp<ViewStyle> };
type HeaderProps = { title: string; canGoBack: boolean; goBack: () => void; openMenu: () => void };
type FieldProps = { label: string; value: string; onChangeText: (value: string) => void; keyboardType?: KeyboardTypeOptions; autoCapitalize?: TextInputProps['autoCapitalize']; maxLength?: number };
type Customer = { name: string; email: string; phone: string; people: string };

const titles: Record<ScreenName, string> = {
  home: 'Adventure Escape SA',
  about: 'About us',
  adventures: 'Adventures',
  advice: 'Details',
  booking: 'Total fees',
  contacts: 'Contacts',
  family: 'Family Explorer',
  ultimate: 'Ultimate Adventure',
  ziplining: 'Ziplining',
  kayaking: 'Kayaking',
  corporate: 'Corporate Adventures',
  rock: 'Rock climbing',
};

function openLink(url: string | null | undefined) {
  if (!url) return;
  Linking.openURL(url).catch(() =>
    Alert.alert('Unable to open link', 'Please use the contact details shown on this page.')
  );
}

function Button({ label, onPress, secondary = false, disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondaryButton,
        disabled && s.disabledButton,
        style,
        pressed && !disabled && s.pressed,
      ]}>
      <Text style={s.buttonText}>{label}</Text>
    </Pressable>
  );
}

function Photo({ source, label, style, resizeMode = 'cover' }: PhotoProps) {
  if (!source) {
    return (
      <View accessible accessibilityLabel={`${label}. Photo not added yet.`} style={[s.photo, s.photoPlaceholder, style]}>
        <View style={s.photoSun} />
        <View style={s.photoHillBack} />
        <View style={s.photoHillFront} />
        <Text style={s.photoCaption}>PHOTO TO BE ADDED</Text>
      </View>
    );
  }
  return <Image source={source} accessibilityLabel={label} accessible resizeMode={resizeMode} style={[s.photo, style]} />;
}

function Heading({ children, small = false, style }: HeadingProps) {
  return <Text accessibilityRole="header" style={[small ? s.subheading : s.heading, style]}>{children}</Text>;
}

function Panel({ title, children, color = C.beige, style }: PanelProps) {
  return (
    <View style={[s.panel, { backgroundColor: color }, style]}>
      {title ? <Heading small>{title}</Heading> : null}
      {children}
    </View>
  );
}

function Header({ title, canGoBack, goBack, openMenu }: HeaderProps) {
  return (
    <View style={s.header}>
      <Pressable onPress={openMenu} accessibilityRole="button" accessibilityLabel="Open navigation menu" style={s.iconButton}>
        <View style={s.hamburger}>{[0, 1, 2].map((line) => <View key={line} style={s.menuLine} />)}</View>
      </Pressable>
      <Text accessibilityRole="header" numberOfLines={1} style={s.headerTitle}>{title}</Text>
      {canGoBack ? (
        <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" style={s.iconButton}>
          <Text style={s.iconText}>‹</Text>
        </Pressable>
      ) : <View style={s.iconButton} />}
    </View>
  );
}

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={s.splash}>
      <Pressable accessibilityRole="button" accessibilityLabel="Enter Adventure Escape SA" onPress={onFinish} style={s.splashBrand}>
        <Image source={images.logo} resizeMode="contain" accessibilityLabel="Adventure Escape SA" accessible style={s.splashLogo} />
      </Pressable>
      <View style={s.dots}>{['#2d2a27', '#7d7a74', '#b3b0aa'].map((color) => <View key={color} style={[s.dot, { backgroundColor: color }]} />)}</View>
    </View>
  );
}

function HomeScreen({ navigate }: Pick<ScreenProps, 'navigate'>) {
  return (
    <View style={s.content}>
      <View style={s.heroBanner}>
        <Photo source={images.hero} label="Adventure Escape SA home entrance" style={s.homeHero} resizeMode="contain" />
        <View style={[s.titleBanner, s.homeTitleBanner]}>
          <Text style={[s.bannerTitle, s.homeBannerTitle]}>ADVENTURE</Text>
          <Text style={[s.bannerTitle, s.homeBannerTitle]}>ESCAPE SA</Text>
          <View style={s.bannerLinks}>
            <Text style={[s.bannerLink, s.homeBannerLink]}>• EXPLORE</Text>
            <Text style={[s.bannerLink, s.homeBannerLink]}>• CHALLENGE</Text>
            <Text style={[s.bannerLink, s.homeBannerLink]}>• DISCOVER</Text>
          </View>
        </View>
      </View>

      <Text style={s.sectionLabel}>The Adventure Begins Here</Text>
      <Text style={s.body}>{data.business}</Text>
      <Text style={s.body}>Your next getaway starts outdoors. Find a family day out, a mountain challenge, or a new way to explore.</Text>

      <Text style={s.sectionLabel}>Reasons for choosing us</Text>
      {data.reasons.map((reason, index) => (
        <View key={reason.title} style={s.reasonCard}>
          <Photo source={reason.image} label={reason.title} style={s.reasonImage} />
          <View style={s.cardCopy}>
            <Text style={s.cardNumber}>0{index + 1}</Text>
            <Heading small>{reason.title}</Heading>
            <Text style={s.body}>{reason.text}</Text>
          </View>
        </View>
      ))}
      <Button label="Explore Adventure" onPress={() => navigate('adventures')} />
    </View>
  );
}

function AboutScreen() {
  const { width } = useWindowDimensions();
  return (
    <View style={s.content}>
      <View style={s.hero}>
        <Photo source={images.about} label="Hiking in the mountains" style={s.aboutHero} resizeMode="contain" />
        <View style={s.darkOverlay}>
          <Heading style={s.white}>Who Are We?</Heading>
          <Text style={[s.body, s.white]}>{data.business}</Text>
        </View>
      </View>
      <Panel title="Goals" color={C.orange}><Text style={s.body}>{data.about.goals}</Text></Panel>
      <View style={[s.columns, width < 420 && s.stacked]}>
        <Panel title="Vision" style={s.column}><Text style={s.body}>{data.about.vision}</Text></Panel>
        <Panel title="Mission" style={s.column}><Text style={s.body}>{data.about.mission}</Text></Panel>
      </View>
      <Panel title="History" color={C.green}><Text style={s.body}>{data.about.history}</Text></Panel>
    </View>
  );
}

function AdventureScreen({ navigate }: Pick<ScreenProps, 'navigate'>) {
  const { width } = useWindowDimensions();
  return (
    <View style={s.content}>
      <View style={s.listIntro}>
        <Text style={s.eyebrow}>PICK YOUR PACE</Text>
        <Heading>Find your adventure</Heading>
        <Text style={s.body}>From easy-going escapes to big outdoor days.</Text>
      </View>
      {data.listIds.map((id, index) => {
        const item = packages[id];
        return (
          <View key={id} style={[s.adventureCard, width < 420 && s.stacked]}>
            <Photo source={item.listImage} label={item.name} style={[s.listImage, width < 420 && s.listImageWide]} />
            <View style={s.listCopy}>
              <Text style={s.cardNumber}>0{index + 1}</Text>
              <Heading small>{item.name}</Heading>
              <Text style={s.price}>{formatMoney(item.priceCents)}</Text>
              <Text style={s.body}>{item.listTagline || item.tagline}</Text>
              {item.tags?.length ? <View style={s.tags}>{item.tags.map((tag) => <Text key={tag} style={s.tag}>{tag}</Text>)}</View> : null}
              <Button label="View details" onPress={() => navigate(id)} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

function SharedPackageScreen({ packageId, navigate }: { packageId: PackageId; navigate: Navigate }) {
  const item = packages[packageId];
  const [activeImage, setActiveImage] = useState(0);
  return (
    <View style={[s.content, s.packageContent]}>
      <Photo source={item.gallery[activeImage]} label={`${item.name}, photo ${activeImage + 1}`} style={s.packageHero} resizeMode="contain" />
      {item.gallery.length > 1 ? (
        <View style={s.gallery}>
          {item.gallery.slice(1).map((source, index) => (
            <Pressable key={index} onPress={() => setActiveImage(index + 1)} accessibilityRole="button" accessibilityLabel={`Show photo ${index + 2}`} accessibilityState={{ selected: activeImage === index + 1 }} style={[s.packageThumbnail, activeImage === index + 1 && s.thumbnailSelected]}>
              <Photo source={source} label={`${item.name}, preview ${index + 2}`} style={s.packageThumbnailImage} resizeMode="contain" />
            </Pressable>
          ))}
        </View>
      ) : null}
      <View style={s.packageHeadingRow}>
        <Heading style={s.packageTitle}>{item.detailTitle || `${item.name} Package`}</Heading>
        <Text style={s.packagePrice}>{formatMoney(item.priceCents)}</Text>
      </View>
      {item.tagline ? <Text style={s.packageTagline}>{item.tagline}</Text> : null}
      <Text style={s.packageDescription}>{item.description}</Text>
      {item.includes?.length ? (
        <View style={s.packageIncludes}>
          <Text style={s.packageSectionTitle}>Including</Text>
          {item.includes.map((text) => <View key={text} style={s.bulletRow}><Text style={s.bullet}>•</Text><Text style={[s.body, s.flex]}>{text}</Text></View>)}
        </View>
      ) : null}
      {item.specs?.length ? <View style={s.packageSpecs}>{['Duration', 'Age', 'Fitness Level', 'Group size'].map((label, index) => <View key={label} style={s.packageSpec}><Text style={s.packageSpecLabel}>{label}</Text><Text style={s.packageSpecValue}>{item.specs[index] || 'To be confirmed'}</Text></View>)}</View> : null}
      <Button label="Book Your Adventure  ›" style={s.packageBookButton} onPress={() => navigate('booking', { packageId })} />
    </View>
  );
}

function PackageScreen({ route, navigate }: ScreenProps) {
  if (!data.bookingIds.includes(route.name as PackageId)) return null;
  return <SharedPackageScreen packageId={route.name as PackageId} navigate={navigate} />;
}

function DetailsAdviceScreen({ navigate }: Pick<ScreenProps, 'navigate'>) {
  return (
    <View style={s.content}>
      <Photo source={images.about} label="An outdoor hiking escape" style={s.detailHero} />
      <Heading>{data.advice.title}</Heading>
      <Panel color={C.green}><Heading small>{data.advice.heading}</Heading><Text style={s.body}>{data.advice.text}</Text></Panel>
      <Heading small>Package details</Heading>
      {data.detailIds.map((id) => <Button key={id} secondary label={packages[id].name} onPress={() => navigate(id)} />)}
      <Button label="Explore adventures" onPress={() => navigate('adventures')} />
    </View>
  );
}

function Field({ label, value, onChangeText, keyboardType = 'default', autoCapitalize = 'none', maxLength }: FieldProps) {
  return (
    <View style={s.field}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoCorrect={false} maxLength={maxLength} style={s.input} />
    </View>
  );
}

function BookingScreen({ packageId }: Pick<ScreenProps, 'packageId'>) {
  const initialIds = packageId ? [packageId] : data.defaultBookingIds;
  const [selected, setSelected] = useState(initialIds);
  const [quote, setQuote] = useState(() => calculateFees(initialIds));
  const [quoteKey, setQuoteKey] = useState(() => data.bookingIds.filter((id) => initialIds.includes(id)).join(','));
  const [customer, setCustomer] = useState<Customer>({ name: '', email: '', phone: '', people: '1' });
  const key = data.bookingIds.filter((id) => selected.includes(id)).join(',');
  const dirty = key !== quoteKey;
  const ratesReady = selected.length > 0 && selected.every((id) => Number.isInteger(packages[id].priceCents));
  const update = (field: keyof Customer) => (value: string) => setCustomer((previous) => ({ ...previous, [field]: value }));
  const toggle = (id: PackageId) => setSelected((previous) => previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id]);

  function refreshQuote() {
    if (!selected.length) {
      Alert.alert('Choose an adventure', 'Select at least one package to prepare a quote.');
      return;
    }
    if (!ratesReady) {
      Alert.alert('Rates not added yet', 'Package rates are not available. Add the confirmed prices in appData.js to enable the fee calculator.');
      return;
    }
    setQuote(calculateFees(selected));
    setQuoteKey(key);
  }

  function prepareEnquiry() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim());
    const phoneValid = /^\+?[\d\s()-]{7,20}$/.test(customer.phone.trim()) && customer.phone.replace(/\D/g, '').length >= 7;
    if (!customer.name.trim() || !emailValid || !phoneValid) {
      Alert.alert('Check your details', 'Enter your full name, a valid email address and a phone number.');
      return;
    }
    if (!/^\d{1,3}$/.test(customer.people) || Number(customer.people) < 1) {
      Alert.alert('Check number of people', 'Enter a whole number from 1 to 999. Group availability must be confirmed.');
      return;
    }
    if (!selected.length) {
      Alert.alert('Choose an adventure', 'Select at least one package.');
      return;
    }
    Alert.alert('Enquiry prepared', 'This demo has not sent or reserved anything. No payment has been taken. Contact Adventure Escape SA to confirm group pricing and availability.');
  }

  const feeRows: [string, number][] = [
    ['Subtotal', quote.subtotal],
    [`Discount (${quote.discountPercent}%)`, -quote.discount],
    ['VAT (15%)', quote.vat],
    ['Total', quote.total],
  ];

  return (
    <View style={s.content}>
      <Panel title="Your details">
        <View style={s.formGrid}>
          <Field label="Full name" value={customer.name} onChangeText={update('name')} autoCapitalize="words" />
          <Field label="Email" value={customer.email} onChangeText={update('email')} keyboardType="email-address" />
          <Field label="Phone number" value={customer.phone} onChangeText={update('phone')} keyboardType="phone-pad" />
          <Field label="Number of people" value={customer.people} onChangeText={update('people')} keyboardType="number-pad" maxLength={3} />
        </View>
      </Panel>
      <Panel title="Choose your adventures" color={C.orange}>
        {data.bookingIds.map((id) => (
          <Pressable key={id} accessibilityRole="checkbox" accessibilityLabel={`${packages[id].name}, ${formatMoney(packages[id].priceCents)}`} accessibilityState={{ checked: selected.includes(id) }} onPress={() => toggle(id)} style={s.checkboxRow}>
            <View style={[s.checkbox, selected.includes(id) && s.checked]}><Text style={s.checkmark}>{selected.includes(id) ? '✓' : ''}</Text></View>
            <View style={s.flex}><Text style={s.packageName}>{packages[id].name}</Text><Text style={s.bookingPackagePrice}>{formatMoney(packages[id].priceCents)}</Text></View>
          </Pressable>
        ))}
      </Panel>
      <Text style={s.note}>Discounts: 1 booking 0%, 2 bookings 5%, 3 bookings 10%, 4+ bookings 15%. VAT is 15% after discount. Prices are per selected package, not per person.</Text>
      <Button label="Calculate fees" disabled={!ratesReady} onPress={refreshQuote} />
      <Panel title="Quote summary" color={C.green}>
        {!ratesReady ? <Text style={s.body}>Rates are awaiting confirmation. The calculator will activate when package prices are added.</Text> : dirty ? <Text accessibilityLiveRegion="polite" style={s.warning}>Calculate fees to update this quote.</Text> : null}
        {ratesReady && !dirty ? feeRows.map(([label, amount]) => (
          <View key={label} style={[s.feeRow, label === 'Total' && s.totalRow]}>
            <Text style={label === 'Total' ? s.price : s.body}>{label}</Text>
            <Text style={label === 'Total' ? s.price : s.body}>{amount < 0 ? `-${formatMoney(-amount)}` : formatMoney(amount)}</Text>
          </View>
        )) : null}
      </Panel>
      <Button label="Prepare booking enquiry" onPress={prepareEnquiry} />
      <Text style={s.note}>Demo enquiry only. Nothing is submitted, reserved or charged.</Text>
    </View>
  );
}

function ContactScreen() {
  const contact = data.contact;
  const mapsUrl = contact.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}` : null;
  const rows: { label: string; value: string; url: string | null }[] = [
    { label: 'Phone', value: contact.phone, url: contact.phoneUrl },
    { label: 'Email', value: contact.email, url: contact.email ? `mailto:${contact.email}` : null },
    { label: 'Address', value: contact.address, url: mapsUrl },
  ].filter(({ value }) => Boolean(value));
  return (
    <View style={[s.content, s.contactContent]}>
      <View style={s.contactIntro}>
        <Heading small style={s.contactIntroTitle}>Lets Plan Your Next Escape</Heading>
        <Text style={s.contactIntroText}>Got a question? Planning an adventure? Not sure which experience is right for you?</Text>
        <Text style={s.contactIntroEmphasis}>Get in touch.</Text>
      </View>
      <View style={s.contactCard}>
        {rows.map(({ label, value, url }) => (
          <Pressable key={label} accessibilityRole="link" accessibilityLabel={`${label}: ${value}`} onPress={() => openLink(url)} style={s.contactRow}>
            <Text style={s.contactGlyph}>{label === 'Phone' ? '☎' : label === 'Email' ? '✉' : '●'}</Text>
            <View style={s.flex}>
              <Text style={s.contactLabel}>{label}:</Text>
              <Text style={s.contactValue}>{value}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View>
        <Pressable accessibilityRole="link" accessibilityLabel="Google Maps location preview" disabled={!mapsUrl} onPress={() => openLink(mapsUrl)} style={s.mapLabelRow}>
          <Text style={s.mapLinkGlyph}>⌖</Text><Text style={s.mapLinkText}>Google maps mockup</Text>
        </Pressable>
        <View accessible accessibilityLabel="Map preview for Cape Town" style={s.mapMockup}>
          <View style={s.mapPark} />
          <View style={s.mapWater} />
          <View style={[s.mapRoad, s.mapRoadOne]} />
          <View style={[s.mapRoad, s.mapRoadTwo]} />
          <View style={[s.mapRoad, s.mapRoadThree]} />
          <View style={[s.mapRoad, s.mapRoadFour]} />
          <Text style={s.mapPlace}>Cape Town</Text>
          <Text style={s.mapPin}>●</Text>
        </View>
      </View>
      {contact.socials.length ? (
        <View style={s.socialSection}>
          <Heading small style={s.socialHeading}>Follow our Adventure:</Heading>
          <View style={s.socials}>
            {contact.socials.map((label) => (
              <View key={label} style={s.socialItem}>
                <View style={[s.socialIcon, label === 'Facebook' ? s.facebookIcon : label === 'Instagram' ? s.instagramIcon : s.tiktokIcon]}>
                  <Text style={s.socialIconText}>{label === 'Facebook' ? 'f' : label === 'Instagram' ? '◎' : '♪'}</Text>
                </View>
                <Text style={s.socialLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

function MenuOverlay({ visible, close, navigate, currentRoute }: { visible: boolean; close: () => void; navigate: Navigate; currentRoute: RouteName }) {
  const { width } = useWindowDimensions();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <View style={s.modalRoot}>
        <Pressable style={s.backdrop} onPress={close} accessibilityRole="button" accessibilityLabel="Close navigation menu" />
        <SafeAreaView edges={['top', 'bottom', 'left']} style={[s.drawer, { width: Math.min(width * 0.88, 380) }]} accessibilityViewIsModal>
          <ScrollView contentContainerStyle={s.drawerContent}>
            <Button label="Close menu" secondary onPress={close} />
            {data.menu.map((entry) => <Pressable key={entry.route} accessibilityRole="button" accessibilityLabel={entry.label} accessibilityState={{ selected: currentRoute === entry.route }} onPress={() => { close(); navigate(entry.route); }} style={({ pressed }) => [s.menuEntry, currentRoute === entry.route && s.activeMenuEntry, pressed && s.pressed]}><Text style={s.menuEntryText}>{entry.label}</Text><Text style={s.menuArrow}>↗</Text></Pressable>)}
            {data.contact.hours.length ? <Panel title="Working hours" color={C.white}>{data.contact.hours.map((line) => <Text key={line} style={s.body}>{line}</Text>)}</Panel> : null}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const screens: Record<ScreenName, ComponentType<ScreenProps>> = {
  home: HomeScreen,
  about: AboutScreen,
  adventures: AdventureScreen,
  advice: DetailsAdviceScreen,
  family: PackageScreen,
  ultimate: PackageScreen,
  ziplining: PackageScreen,
  kayaking: PackageScreen,
  corporate: PackageScreen,
  rock: PackageScreen,
  booking: BookingScreen,
  contacts: ContactScreen,
};

export default function App() {
  const [stack, setStack] = useState<RouteEntry[]>([{ name: 'splash', key: 0 }]);
  const [menuOpen, setMenuOpen] = useState(false);
  const route = stack[stack.length - 1];
  const [finishSplash] = useState<() => void>(() => () => setStack([{ name: 'home', key: 1 }]));

  function navigate(name: ScreenName, params: { packageId?: PackageId } = {}) {
    setMenuOpen(false);
    setStack((previous) => {
      const last = previous[previous.length - 1];
      if (name === 'home') return [{ name: 'home', key: last.key + 1 }];
      if (last.name === name && !params.packageId) return previous;
      return [...previous, { name, ...params, key: last.key + 1 }];
    });
  }

  function goBack() {
    setStack((previous) => previous.length > 1 ? previous.slice(0, -1) : previous);
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (menuOpen) { setMenuOpen(false); return true; }
      if (stack.length > 1) { setStack((previous) => previous.slice(0, -1)); return true; }
      return false;
    });
    return () => subscription.remove();
  }, [menuOpen, stack.length]);

  const Screen = route.name === 'splash' ? null : screens[route.name];
  const screenProps: ScreenProps = { route, navigate, packageId: route.packageId };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={s.safe} edges={['top', 'bottom', 'left', 'right']}>
        {route.name === 'splash' ? <SplashScreen onFinish={finishSplash} /> : (
          <View style={s.shell}>
            <Header title={titles[route.name as ScreenName] || 'Adventure Escape SA'} canGoBack={stack.length > 1} goBack={goBack} openMenu={() => setMenuOpen(true)} />
            <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView key={route.key} style={s.flex} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
                {Screen ? <Screen {...screenProps} /> : null}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )}
        <MenuOverlay visible={menuOpen} close={() => setMenuOpen(false)} navigate={navigate} currentRoute={route.name} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#efe7d5',
  },
  flex: { flex: 1 },
  shell: { flex: 1, width: '100%', maxWidth: '100%', alignSelf: 'stretch', backgroundColor: '#efe7d5' },
  scrollContent: { paddingBottom: 28 },
  content: { paddingHorizontal: 14, paddingVertical: 16, gap: 18, backgroundColor: '#efe7d5' },
  header: { minHeight: 58, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(59,42,32,0.12)', backgroundColor: '#efe7d5' },
  headerTitle: { flex: 1, fontFamily: serif, fontSize: 20, color: C.brown, textAlign: 'center' },
  iconButton: { width: 46, height: 48, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 38, lineHeight: 42, color: C.charcoal },
  hamburger: { gap: 5 },
  menuLine: { width: 23, height: 2, backgroundColor: C.charcoal },
  heading: { fontFamily: serif, fontSize: 30, lineHeight: 38, color: C.brown, flexShrink: 1 },
  subheading: { fontFamily: serif, fontSize: 22, lineHeight: 29, color: C.brown, flexShrink: 1 },
  body: { fontSize: 16, lineHeight: 24, color: C.brown },
  white: { color: C.white },
  sectionLabel: { fontSize: 16, lineHeight: 24, color: C.brown, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  eyebrow: { fontSize: 12, lineHeight: 18, letterSpacing: 1.5, color: C.brown, fontWeight: '700' },
  price: { fontSize: 18, lineHeight: 26, fontWeight: '700', color: C.brown, flexShrink: 1 },
  tagline: { fontFamily: serif, fontSize: 20, lineHeight: 28, color: C.brown },
  button: { minHeight: 48, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, backgroundColor: '#f7b14d', justifyContent: 'center', alignItems: 'center' },
  secondaryButton: { backgroundColor: '#e3d5be' },
  disabledButton: { opacity: 0.55 },
  buttonText: { color: C.brown, fontSize: 16, lineHeight: 23, fontWeight: '700', textAlign: 'center' },
  pressed: { opacity: 0.72 },
  panel: { padding: 18, borderRadius: 14, gap: 12, backgroundColor: '#f7f2eb', borderWidth: 0, overflow: 'hidden' },
  photo: { width: '100%', aspectRatio: 1.5, borderRadius: 14, overflow: 'hidden' },
  photoPlaceholder: { backgroundColor: '#87977A', justifyContent: 'flex-end', padding: 14 },
  photoSun: { position: 'absolute', width: 72, height: 72, borderRadius: 36, right: '16%', top: '15%', backgroundColor: C.orange },
  photoHillBack: { position: 'absolute', width: '120%', height: '65%', left: '-12%', bottom: '8%', borderRadius: 180, backgroundColor: C.green, transform: [{ rotate: '-8deg' }] },
  photoHillFront: { position: 'absolute', width: '130%', height: '45%', right: '-18%', bottom: '-14%', borderRadius: 180, backgroundColor: C.brown, transform: [{ rotate: '7deg' }] },
  photoCaption: { color: C.white, fontSize: 10, lineHeight: 14, fontWeight: '700', letterSpacing: 1.2, zIndex: 1 },
  hero: { overflow: 'hidden', borderRadius: 10 },
  heroBanner: { position: 'relative', overflow: 'hidden', borderRadius: 10 },
  homeHero: { width: '45%', alignSelf: 'center', aspectRatio: 1.55, borderRadius: 0 },
  titleBanner: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.18)', paddingHorizontal: 18, paddingVertical: 16 },
  homeTitleBanner: { left: '27.5%', right: '27.5%', paddingHorizontal: 6, paddingVertical: 7 },
  bannerTitle: { color: '#f6f2ec', fontSize: 26, lineHeight: 30, fontWeight: '700', letterSpacing: 1.1, textAlign: 'left', fontFamily: serif },
  homeBannerTitle: { fontSize: 15, lineHeight: 18, letterSpacing: 0.5 },
  bannerLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  bannerLink: { color: '#f6f2ec', fontSize: 10, letterSpacing: 1.2, fontWeight: '700' },
  homeBannerLink: { fontSize: 7, letterSpacing: 0.4 },
  listIntro: { gap: 9, paddingVertical: 6 },
  reasonCard: { backgroundColor: '#f7f3ee', borderRadius: 10, overflow: 'hidden' },
  reasonImage: { aspectRatio: 1.5, borderRadius: 0 },
  cardCopy: { padding: 17, gap: 8 },
  cardNumber: { fontSize: 12, lineHeight: 16, color: '#8A6A46', fontWeight: '700' },
  aboutHero: { width: '90%', alignSelf: 'center', aspectRatio: 1.5, borderRadius: 0 },
  darkOverlay: { backgroundColor: 'rgba(41,39,37,0.78)', padding: 20, gap: 12, marginTop: -38 },
  columns: { flexDirection: 'row', gap: 12 },
  column: { flex: 1 },
  stacked: { flexDirection: 'column' },
  adventureCard: { flexDirection: 'row', borderRadius: 10, backgroundColor: '#f7f3ee', overflow: 'hidden' },
  listImage: { width: '34%', alignSelf: 'stretch', borderRadius: 0, minHeight: 200 },
  listImageWide: { width: '100%', aspectRatio: 1.5, minHeight: 0 },
  listCopy: { flex: 1, padding: 14, gap: 9 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: C.green, color: C.charcoal, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 4, fontSize: 12 },
  detailHero: { aspectRatio: 1.4 },
  packageContent: { paddingHorizontal: 2, paddingTop: 6, gap: 9 },
  packageHero: { width: '100%', aspectRatio: 1.5, borderRadius: 0, backgroundColor: '#e6dcc8' },
  gallery: { flexDirection: 'row', justifyContent: 'center', gap: 9 },
  thumbnail: { flex: 1, borderRadius: 6, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  thumbnailSelected: { borderColor: C.brown },
  thumbnailImage: { aspectRatio: 1, borderRadius: 0 },
  packageThumbnail: { width: '31%', flexGrow: 0, borderRadius: 0, overflow: 'hidden', borderWidth: 1, borderColor: 'transparent' },
  packageThumbnailImage: { width: '100%', aspectRatio: 1.5, borderRadius: 0, backgroundColor: '#e6dcc8' },
  packageHeadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingHorizontal: 4 },
  packageTitle: { flex: 1, fontSize: 19, lineHeight: 25, color: '#BE622C' },
  packagePrice: { fontSize: 15, lineHeight: 21, color: C.brown, fontWeight: '700' },
  packageTagline: { paddingHorizontal: 4, fontSize: 14, lineHeight: 20, color: C.charcoal, fontWeight: '700' },
  packageDescription: { paddingHorizontal: 4, fontSize: 14, lineHeight: 20, color: C.charcoal },
  packageIncludes: { gap: 2, paddingHorizontal: 4 },
  packageSectionTitle: { color: '#BE622C', fontSize: 14, lineHeight: 20, fontWeight: '700' },
  packageSpecs: { flexDirection: 'row', backgroundColor: '#FF8A2B', borderRadius: 7, paddingVertical: 10, paddingHorizontal: 5 },
  packageSpec: { flex: 1, alignItems: 'center', gap: 4, paddingHorizontal: 2 },
  packageSpecLabel: { color: C.white, fontSize: 10, lineHeight: 13, fontWeight: '700', textAlign: 'center' },
  packageSpecValue: { color: C.charcoal, fontSize: 10, lineHeight: 13, fontWeight: '700', textAlign: 'center' },
  packageBookButton: { backgroundColor: C.green, borderRadius: 7, minHeight: 46 },
  bulletRow: { flexDirection: 'row', gap: 10 },
  bullet: { fontSize: 19, lineHeight: 24, color: C.brown },
  specGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  spec: { width: '48%', backgroundColor: C.green, borderRadius: 6, padding: 14, gap: 5 },
  specLabel: { fontSize: 14, lineHeight: 20, color: C.charcoal, fontWeight: '700' },
  formGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 },
  field: { width: '48%', gap: 6 },
  fieldLabel: { fontSize: 14, lineHeight: 20, color: C.brown },
  input: { backgroundColor: C.white, borderRadius: 6, paddingHorizontal: 11, paddingVertical: 11, minHeight: 46, color: C.charcoal, fontSize: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 54, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(59,42,32,0.18)' },
  checkbox: { width: 27, height: 27, borderWidth: 2, borderColor: C.charcoal, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: C.charcoal },
  checkmark: { color: C.white, fontWeight: '700', fontSize: 17 },
  packageName: { color: C.brown, fontWeight: '700', fontSize: 15, lineHeight: 22 },
  bookingPackagePrice: { color: C.brown, fontSize: 14, lineHeight: 20 },
  note: { fontSize: 13, lineHeight: 19, color: C.brown },
  warning: { fontSize: 14, lineHeight: 21, color: C.brown, fontWeight: '700', backgroundColor: C.cream, padding: 11, borderRadius: 6 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' },
  totalRow: { borderTopWidth: 1, borderTopColor: C.brown, paddingTop: 12 },
  contactContent: { gap: 14, paddingTop: 8 },
  contactIntro: { alignItems: 'center', gap: 3, paddingHorizontal: 4 },
  contactIntroTitle: { fontSize: 18, lineHeight: 24, textAlign: 'center', color: C.brown },
  contactIntroText: { fontSize: 14, lineHeight: 19, color: C.brown, textAlign: 'center' },
  contactIntroEmphasis: { fontSize: 14, lineHeight: 18, color: C.brown, fontWeight: '700' },
  contactCard: { backgroundColor: '#FF852C', borderRadius: 24, paddingHorizontal: 14, paddingVertical: 12, gap: 4 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  contactGlyph: { width: 30, color: C.charcoal, fontSize: 26, textAlign: 'center' },
  contactLabel: { fontSize: 14, lineHeight: 18, color: C.white, fontWeight: '700' },
  contactValue: { fontSize: 14, lineHeight: 18, color: C.white },
  linkText: { textDecorationLine: 'underline' },
  mapLabelRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 4, paddingBottom: 4 },
  mapLinkGlyph: { color: '#7835B4', fontSize: 16 },
  mapLinkText: { color: '#7835B4', fontSize: 14, textDecorationLine: 'underline' },
  mapMockup: { height: 116, width: '82%', alignSelf: 'center', overflow: 'hidden', backgroundColor: '#EAF0DB' },
  mapPark: { position: 'absolute', width: '46%', height: '52%', left: '4%', top: '8%', backgroundColor: '#D3E7C3', borderRadius: 26, transform: [{ rotate: '-12deg' }] },
  mapWater: { position: 'absolute', width: '80%', height: 16, left: '-10%', top: '68%', backgroundColor: '#B7DDE5', transform: [{ rotate: '-18deg' }] },
  mapRoad: { position: 'absolute', height: 5, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DED9C7' },
  mapRoadOne: { width: '112%', left: '-5%', top: '30%', transform: [{ rotate: '12deg' }] },
  mapRoadTwo: { width: '110%', left: '-4%', top: '52%', transform: [{ rotate: '-10deg' }] },
  mapRoadThree: { width: '100%', left: '-8%', top: '80%', transform: [{ rotate: '8deg' }] },
  mapRoadFour: { width: '95%', left: '28%', top: '48%', transform: [{ rotate: '72deg' }] },
  mapPlace: { position: 'absolute', left: '53%', top: '38%', color: '#59614D', fontSize: 9 },
  mapPin: { position: 'absolute', left: '65%', top: '47%', color: '#E24D3E', fontSize: 19, textShadowColor: C.white, textShadowRadius: 2 },
  socialSection: { alignItems: 'center', gap: 8, paddingTop: 2 },
  socialHeading: { fontSize: 15, lineHeight: 20, textAlign: 'center', color: C.brown },
  socials: { width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' },
  socialItem: { alignItems: 'center', gap: 3 },
  socialIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  facebookIcon: { backgroundColor: '#1877F2', borderRadius: 20 },
  instagramIcon: { backgroundColor: '#D62976' },
  tiktokIcon: { backgroundColor: '#111111' },
  socialIconText: { color: C.white, fontSize: 30, lineHeight: 38, fontWeight: '700' },
  socialLabel: { fontSize: 10, lineHeight: 13, color: C.charcoal },
  splash: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, gap: 18, backgroundColor: '#efe7d5' },
  splashBrand: { width: '100%', maxWidth: 960, aspectRatio: 1160 / 370, justifyContent: 'center', alignItems: 'center' },
  splashLogo: { width: '100%', height: '100%' },
  dots: { flexDirection: 'row', gap: 9 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  modalRoot: { flex: 1, flexDirection: 'row', justifyContent: 'flex-start' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(41,39,37,0.48)' },
  drawer: { height: '100%', backgroundColor: '#BE622C' },
  drawerContent: { padding: 18, gap: 14 },
  menuEntry: { minHeight: 52, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', borderRadius: 6, borderBottomWidth: 1, borderBottomColor: '#000000' },
  activeMenuEntry: { backgroundColor: 'rgba(255,255,255,0.18)' },
  menuEntryText: { flex: 1, fontFamily: serif, fontSize: 21, lineHeight: 28, color: C.white },
  menuArrow: { color: C.white, fontSize: 17 },
});