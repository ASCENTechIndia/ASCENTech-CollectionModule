using Oracle.DataAccess.Client;
using System;
using System.Data;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TMFLAssetMngmt.Agency
{
    public partial class FrmAgencyCreation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadStates();
            }
        }
        public void MessageAlert2(String Message, String WindowsLocation)
        {
            String str = "";

            str = "alert('|| " + Message + " ||');";

            if (WindowsLocation != "")
            {
                str += "window.location = '" + WindowsLocation + "';";
            }

            ScriptManager.RegisterStartupScript(this, typeof(Page), UniqueID, str, true);
            return;
        }
        public void MessageAlert(string message, string WindowsLocation)
        {

            lblPopupResponsenew.Text = "|| " + message + "||";
            popMsgNew.Show();

            if (WindowsLocation != "")
            {
                lblredirect.Text = WindowsLocation;
            }
            else
            {
                lblredirect.Text = "";
            }
        
              //  Response.Redirect(Page.ResolveClientUrl("~/HomePage/FrmDashboard.aspx"));

        }
        private void LoadStates()
        {
            string query = "SELECT StateID, StateName FROM States ORDER BY StateName";

            DataTable dt = (DataTable)TMFLAssetClassLib.Methods.MstMethods.Query2DataTable.GetResult(query);

            ddlState.DataSource = dt;
            ddlState.DataTextField = "StateName";
            ddlState.DataValueField = "StateID";
            ddlState.DataBind();

            ddlState.Items.Insert(0, new ListItem("--Select State--", ""));
        }

        protected void ddlState_SelectedIndexChanged(object sender, EventArgs e)
        {
            ddlDistrict.Items.Clear();
            ddlDistrict.Items.Insert(0, new ListItem("--Select District--", ""));
           // ddlTahsil.Items.Clear();
           // ddlTahsil.Items.Insert(0, new ListItem("--Select Tahsil--", ""));

            if (!string.IsNullOrEmpty(ddlState.SelectedValue))
            {
                string query = $"SELECT DistrictID, DistrictName FROM Districts WHERE StateID='{ddlState.SelectedValue}' ORDER BY DistrictName";

                DataTable dt = (DataTable)TMFLAssetClassLib.Methods.MstMethods.Query2DataTable.GetResult(query);

                ddlDistrict.DataSource = dt;
                ddlDistrict.DataTextField = "DistrictName";
                ddlDistrict.DataValueField = "DistrictID";
                ddlDistrict.DataBind();

                ddlDistrict.Items.Insert(0, new ListItem("--Select District--", ""));
            }
        }

        //protected void ddlDistrict_SelectedIndexChanged(object sender, EventArgs e)
        //{
        //    ddlTahsil.Items.Clear();
        //    ddlTahsil.Items.Insert(0, new ListItem("--Select Tahsil--", ""));

        //    if (!string.IsNullOrEmpty(ddlDistrict.SelectedValue))
        //    {
        //        string query = $"SELECT TahsilID, TahsilName FROM Tahsils WHERE DistrictID='{ddlDistrict.SelectedValue}' ORDER BY TahsilName";

        //        DataTable dt = (DataTable)TMFLAssetClassLib.Methods.MstMethods.Query2DataTable.GetResult(query);

        //        ddlTahsil.DataSource = dt;
        //        ddlTahsil.DataTextField = "TahsilName";
        //        ddlTahsil.DataValueField = "TahsilID";
        //        ddlTahsil.DataBind();

        //        ddlTahsil.Items.Insert(0, new ListItem("--Select Tahsil--", ""));
        //    }
        //}


        protected void ddlMainProducts_SelectedIndexChanged(object sender, EventArgs e)
        {
            chkProductOptions.Items.Clear(); // clear old values

            switch (ddlMainProducts.SelectedValue)
            {
                case "1": // Commercial
                    chkProductOptions.Items.Add(new ListItem("Office", "Office"));
                    chkProductOptions.Items.Add(new ListItem("Shop", "Shop"));
                    chkProductOptions.Items.Add(new ListItem("Mall", "Mall"));
                    break;

                case "2": // Non Commercial
                    chkProductOptions.Items.Add(new ListItem("House", "House"));
                    chkProductOptions.Items.Add(new ListItem("Flat", "Flat"));
                    chkProductOptions.Items.Add(new ListItem("Bungalow", "Bungalow"));
                    break;

                case "3": // Transport
                    chkProductOptions.Items.Add(new ListItem("Truck", "Truck"));
                    chkProductOptions.Items.Add(new ListItem("Bus", "Bus"));
                    chkProductOptions.Items.Add(new ListItem("Taxi", "Taxi"));
                    break;

                default:
                    // nothing selected
                    break;
            }
        }


        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string agencyName = txtAgencyName.Text.Trim();
            string stateID = ddlState.SelectedValue;
            string districtID = ddlDistrict.SelectedValue;
           // string tahsilID = ddlTahsil.SelectedValue;
            string village = txtVillage.Text.Trim();
            string address = txtAddress.Text.Trim();

            string products = string.Join(",",
       chkProductOptions.Items.Cast<ListItem>()
                              .Where(i => i.Selected)
                              .Select(i => i.Value));

          
           // string sma = ddlbucket.SelectedValue;
            string sma = string.Join(",",
                          chkSMA.Items.Cast<ListItem>()
                          .Where(i => i.Selected)
                          .Select(i => i.Value));

            string query = $@"
        INSERT INTO Agencies (AgencyName, StateID, DistrictID, VillageName, Address,PRODUCTS,SMA_BUCKET)
        VALUES ('{agencyName}', '{stateID}', '{districtID}',  '{village}', '{address}','{products}','{sma}')";

            int result = GetResult(query);

            if (result > 0)
            {
                MessageAlert("Agency Created Successfully!", "../HomePage/FrmDashboard.aspx");

            }
            else
            {
                      MessageAlert("Failed to create Agency.", "../HomePage/FrmDashboard.aspx");
            }
        }



        public static int GetResult(string Query)
        {
            int rowsAffected = 0;
            TMFLAssetClassLib.Data.GetCon Con = new TMFLAssetClassLib.Data.GetCon();
            Con.OpenConn();

            using (OracleCommand Cmd = new OracleCommand(Query, Con.connection))
            {
                rowsAffected = Cmd.ExecuteNonQuery();  // ✅ correct way
            }

            Con.CloseConn();
            return rowsAffected;
        }

        protected void btnyes_Click(object sender, EventArgs e)
        {
            Response.Redirect("../Asset/FrmAssetAsgnRef.aspx");
        }

        protected void btnCloseMsg_Click(object sender, EventArgs e)
        {
            Response.Redirect("../HomePage/FrmDashboard.aspx");

        }

    }
}
