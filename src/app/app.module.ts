import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {HttpClientModule} from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {MyApp} from './app.component';
import {VideoPage} from '../pages/video/video';
import {AudioPage} from '../pages/audio/audio';
import {TabsPage} from '../pages/tabs/tabs';
import {GuidedPage} from '../pages/guided/guided';
import {MorePage} from '../pages/more/more';
import {LoginPage} from '../pages/login/login';
import { CoachingPage } from '../pages/coaching/coaching'
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpModule } from '@angular/http';
import {VideoplayerPage} from '../pages/videoplayer/videoplayer';
import {AudioplayerPage} from '../pages/audioplayer/audioplayer';
import { LessonplayerPage } from '../pages/lessonplayer/lessonplayer'
import {SignedupPage} from "../pages/signedup/signedup";
import {ResetpasswordPage} from "../pages/resetpassword/resetpassword";
import {AboutPage} from "../pages/about/about";
import {HomePage} from "../pages/home/home";
import {MasterclassPage} from "../pages/masterclass/masterclass";
import {UnlimitedpremiumPage} from "../pages/unlimitedpremium/unlimitedpremium";
import { PlansPage } from "../pages/plans/plans"
import {ReminderPage } from "../pages/reminder/reminder"
import { IntroPage }  from "../pages/intro/intro"
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ProviderAuthProvider } from '../providers/provider-auth/provider-auth';
import { SubscriptiondataProvider } from '../providers/subscriptiondata/subscriptiondata';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ProvidersLoaderProvider } from '../providers/providers-loader/providers-loader';
import { BackgroundMode } from '@ionic-native/background-mode';
@NgModule({
  declarations: [
    MyApp,
    VideoPage,
    AudioPage,
    TabsPage,
    GuidedPage,
    MorePage,
    LoginPage,
    SignedupPage,
    VideoplayerPage,
    ResetpasswordPage,
    AudioplayerPage,
    LessonplayerPage,
    AboutPage,
    CoachingPage,
    HomePage,
    MasterclassPage,
    UnlimitedpremiumPage,
    PlansPage,
    ReminderPage,
    IntroPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideoPage,
    AudioPage,
    TabsPage,
    GuidedPage,
    MorePage,
    LoginPage,
    SignedupPage,
    VideoplayerPage,
    ResetpasswordPage,
    AudioplayerPage,
    LessonplayerPage,
    AboutPage,
    CoachingPage,
    HomePage,
    MasterclassPage,
    UnlimitedpremiumPage,
    PlansPage,
    ReminderPage,
    IntroPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    FileTransfer,
    File,
    LocalNotifications,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderAuthProvider,
    SubscriptiondataProvider,
    ProvidersLoaderProvider,
    BackgroundMode
  ]
})
export class AppModule {
}
