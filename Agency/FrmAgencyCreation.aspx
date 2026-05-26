<%@ Page Title="Agency Creation" Language="C#" MasterPageFile="~/MasterPage/MasterPage.Master" AutoEventWireup="true" CodeBehind="FrmAgencyCreation.aspx.cs" Inherits="TMFLAssetMngmt.Agency.FrmAgencyCreation" %>
<%@ Register Src="../WebUserControls/DropdownWithSearch.ascx" TagName="DropdownWithSearch" TagPrefix="uc3" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<%@ Register Src="../WebUserControls/Date.ascx" TagName="Date" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style>
  body {
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    background: linear-gradient(135deg, #eef2f3, #dfe9f3);
    margin: 0;
  }

  .form-wrapper {
    display: flex;
    justify-content: center;
    padding: 50px 20px;
  }

  .form-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    padding: 35px;
    width: 100%;
    max-width: 950px;
    animation: fadeIn 0.8s ease;
  }

  .form-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, #3f51b5, #5a55ca);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 30px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 22px;
  }

  .form-group { display: flex; flex-direction: column; }

  .form-group label {
    font-weight: 600;
    margin-bottom: 6px;
    color: #2c3e50;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px;
    border: 1px solid #d0d7de;
    border-radius: 10px;
    font-size: 15px;
    background: #fff;
    transition: all 0.25s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 0 4px rgba(63,81,181,0.2);
    outline: none;
  }

  .form-group textarea {
    resize: none;
  }

  .btn-submit {
    margin-top: 30px;
    background: linear-gradient(135deg, #3f51b5, #5a55ca);
    color: #fff;
    padding: 14px;
    width: 100%;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
  }

  .btn-submit:hover {
    background: linear-gradient(135deg, #5a55ca, #3f51b5);
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(63, 81, 181, 0.4);
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Popup Styling */
  .Popup {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }

  .Popup table td {
    font-size: 14px;
  }

  .Button {
    background: linear-gradient(135deg, #3f51b5, #5a55ca);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .Button:hover {
    background: linear-gradient(135deg, #5a55ca, #3f51b5);
    transform: scale(1.05);
  }
</style>

<script type="text/javascript">
  function InProgress() {
      document.getElementById("imgrefresh").style.visibility = 'visible';
  }
  function onComplete() {
      document.getElementById("imgrefresh").style.visibility = 'hidden';
  }
  function closePopup() { $find("mpeConfirmation").hide(); return false; }
  function closeMsgPopup() { $find("mpeMsg").hide(); return false; }
  function closeMsgPopupnew() {
      $find("mpeMsgnew").hide();
      var el = document.getElementById('lblredirect');
      var aa = el.innerHTML;
      if (aa != "") { window.location.href = aa; }
      return false;
  }
</script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<!-- ✅ UpdatePanelAnimationExtender moved OUTSIDE the UpdatePanel -->
<cc1:UpdatePanelAnimationExtender ID="UpdatePanelAnimationExtender1" runat="server"
    TargetControlID="UpdatePanel1">
    <Animations>
        <OnUpdating>
            <Parallel duration="0">
                <ScriptAction Script="InProgress();" /> 
            </Parallel>
        </OnUpdating>
        <OnUpdated>
            <Parallel duration="0">
                <ScriptAction Script="onComplete();" /> 
            </Parallel>
        </OnUpdated>
    </Animations>
</cc1:UpdatePanelAnimationExtender>

<!-- UpdatePanel content remains the same -->
<asp:UpdatePanel ID="UpdatePanel1" runat="server">
    <ContentTemplate>
        <div class="form-wrapper">
          <div class="form-card">
            <h2 class="form-title"> Agency Creation</h2>

            <div class="form-grid">
              <div class="form-group">
                <label>Agency Name</label>
                <asp:TextBox ID="txtAgencyName" runat="server" />
              </div>

              <div class="form-group">
                <label>Select State</label>
                <asp:DropDownList ID="ddlState" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlState_SelectedIndexChanged">
                  <asp:ListItem Text="--Select State--" Value="" />
                </asp:DropDownList>
              </div>

              <div class="form-group">
                <label>Select District</label>
                <asp:DropDownList ID="ddlDistrict" runat="server" AutoPostBack="true">
                  <asp:ListItem Text="--Select District--" Value="" />
                </asp:DropDownList>
                 <%-- OnSelectedIndexChanged="ddlDistrict_SelectedIndexChanged--%>
              </div>

             <%-- <div class="form-group">
                <label>Select Tahsil</label>
                <asp:DropDownList ID="ddlTahsil" runat="server">
                  <asp:ListItem Text="--Select Tahsil--" Value="" />
                </asp:DropDownList>
              </div>--%>

              <div class="form-group">
                <label>Agency City</label>
                <asp:TextBox ID="txtVillage" runat="server" />
              </div>

             <div class="form-group">
    <label>Agency Products</label>
    <asp:DropDownList ID="ddlMainProducts" runat="server" 
        AutoPostBack="true" 
        OnSelectedIndexChanged="ddlMainProducts_SelectedIndexChanged">
        <asp:ListItem Text="-- Select Main Product --" Value="0" />
        <asp:ListItem Text="Commercial" Value="1" />
        <asp:ListItem Text="Non Commercial" Value="2" />
        <asp:ListItem Text="Transport" Value="3" />
    </asp:DropDownList>
</div>

<div class="form-group">
    <label>Select Options</label><br />
    <asp:CheckBoxList ID="chkProductOptions" runat="server" RepeatDirection="Vertical">
    </asp:CheckBoxList>
</div>


            <div class="form-group">
    <label>Select SMA Bucket</label>
    <asp:CheckBoxList ID="chkSMA" runat="server" RepeatDirection="Horizontal">
         <asp:ListItem Text="ALL SMA" Value="ALL SMA" />
        <asp:ListItem Text="SMA0" Value="SMA0" />
        <asp:ListItem Text="SMA1" Value="SMA1" />
        <asp:ListItem Text="SMA2" Value="SMA2" />
        
    </asp:CheckBoxList>
</div>


              <div class="form-group" style="grid-column: span 2;">
                <label>Agency Address</label>
                <asp:TextBox ID="txtAddress" runat="server" TextMode="MultiLine" Rows="3" />
              </div>
            </div>

            <asp:Button ID="btnSubmit" runat="server" CssClass="btn-submit" Text="✨ Create Agency" OnClick="btnSubmit_Click" />
          </div>
        </div>
    </ContentTemplate>
</asp:UpdatePanel>

<!-- Popup Extenders remain outside -->
<ajaxToolkit:ModalPopupExtender ID="popMsgNew" runat="server" BehaviorID="mpeMsgnew"
    TargetControlID="hdnPopnew" PopupControlID="pnlMessagenew" CancelControlID="imgClosenew">
</ajaxToolkit:ModalPopupExtender>
<asp:HiddenField ID="hdnPopnew" runat="server" />
<asp:Panel ID="pnlMessagenew" runat="server" CssClass="Popup" Style="width: 430px; height: 160px; display: none;">
    <asp:Image ID="imgClosenew" ToolTip="Close" runat="server" Style="z-index: -1; float: right;
        margin-top: -15px; margin-right: -15px;" onclick="closeMsgPopupnew();" ImageUrl="~/Images/closebtn.png" />
    <center>
        <br />
        <table width="100%">
            <tr>
                <td align="left" colspan="3" style="color: #094791; font-weight: bold;">&nbsp;&nbsp;&nbsp;Message</td>
            </tr>
            <tr><td colspan="3"><hr /></td></tr>
        </table>
        <table width="90%">
            <tr>
                <td align="center" colspan="3">
                    <asp:Label ID="lblPopupResponsenew" runat="server" Font-Bold="true" Text=""></asp:Label>
                    <br /><br />
                </td>
            </tr>
            <tr>
                <td align="center" colspan="3">
                    <input id="btnClodeMsg" class="Button" runat="server" type="button" value="OK" style="width: 100px;" onclick="closeMsgPopupnew();" />
                    <asp:Label ID="lblredirect" runat="server" Style="display: none" ClientIDMode="Static"></asp:Label>
                </td>
            </tr>
        </table>
    </center>
</asp:Panel>

<ajaxToolkit:ModalPopupExtender ID="popMsg" runat="server" BehaviorID="mpeMsg" 
    TargetControlID="hdnPop2" PopupControlID="pnlMessage" CancelControlID="imgClose2">
</ajaxToolkit:ModalPopupExtender>
<asp:HiddenField ID="hdnPop2" runat="server" />
<asp:Panel ID="pnlMessage" runat="server" CssClass="Popup" Style="width: 430px; height: 165px; display: none;">
    <asp:Image ID="imgClose2" ToolTip="Close" runat="server" Style="z-index: -1; float: right;
        margin-top: -15px; margin-right: -15px;" onclick="closeMsgPopup();" ImageUrl="~/Images/closebtn.png" />
    <center>
        <br />
        <table width="100%">
            <tr>
                <td bgcolor="#F0F3F4" align="left" colspan="3" style="color: #094791; font-weight: bold;" class="style11">
                    &nbsp;&nbsp;&nbsp;<asp:Label ID="lblresponse" runat="server"></asp:Label><br /><br />
                </td>
            </tr>
        </table>
        <table width="90%">
            <tr>
                <td align="center" colspan="3">
                    <asp:Label ID="lblPopupResponse" runat="server" Style="margin-bottom: 30px; color: Red" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td align="center" colspan="3">
                    <asp:Button ID="btnyes" runat="server" CssClass="Button" Visible="false" Width="100px" Text="Yes" OnClick="btnyes_Click" />
                    &nbsp;&nbsp;
                    <asp:Button ID="btnCloseMsg" runat="server" CssClass="Button" OnClientClick="closeMsgPopup();" Width="100px" Text="No" OnClick="btnCloseMsg_Click" />
                </td>
            </tr>
        </table>
    </center>
</asp:Panel>

</asp:Content>